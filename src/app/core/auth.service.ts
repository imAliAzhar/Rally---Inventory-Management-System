// import { UserComponent } from './../pages/user/user.component';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';

export interface Credentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  password2: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  isLoggedIn() {
    return this.afAuth.auth.currentUser;
  }

  login(credentials: Credentials) {
    return new Promise<auth.UserCredential>((onSuccess, onFail) => {
      this.afAuth.auth
        .signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(userCredential => {
          onSuccess(userCredential);
          this.router.navigate(['/materials']);
        })
        .catch(error => onFail(error));
    });
  }

  logout() {
    this.afAuth.auth.signOut().then(() => this.router.navigate(['/login']));
  }

  createAccount(credentials: Credentials): Promise<auth.UserCredential> {
    return new Promise<auth.UserCredential>((onSuccess, onFail) => {
      this.afAuth.auth
        .createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then(userCredential => {
          onSuccess(userCredential);
          this.router.navigate(['/login']);
        })
        .catch(error => onFail(error));
    });
  }
}
