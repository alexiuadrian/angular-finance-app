import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup; // ! This is a temporary solution to the issue of the error message not being displayed.
  firebaseErrorMessage: string;

  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth) { 
    this.firebaseErrorMessage = '';
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit(): void {
  }

  loginUser() {
    this.firebaseErrorMessage = '';

    this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password)
    .then((result: { message: string; } | null) => {
      if (result == null) {
        this.router.navigate(['/']);
      }
      else {
        this.firebaseErrorMessage = result.message;
      }
    })
      
      .catch((err: { message: string; }) => {
        this.firebaseErrorMessage = err.message;
      });
  }

}
