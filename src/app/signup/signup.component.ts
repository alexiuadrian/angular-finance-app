import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup; // ! This is a temporary solution to the issue of the error message not being displayed.
  firebaseErrorMessage: string;

  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth) {
    this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'displayName': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  signup() {
    this.firebaseErrorMessage = '';

    this.authService.signupUser(this.signupForm.value)
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
