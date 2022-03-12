import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLoggedIn: boolean;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.userLoggedIn = false;
  }

  signupUser(user: any): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
    .then((result) => {
      this.router.navigate(['/']);
    })
    .catch(error => {
      console.log(error);
      return error;
      if(error.code) {
        return {isValid: false, message: error.message}
      }
    });
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      this.router.navigate(['/']);
    })
    .catch(error => {
      console.log(error);
      return error;
      if(error.code) {
        return {isValid: false, message: error.message}
      }
    });
    
  }

}
