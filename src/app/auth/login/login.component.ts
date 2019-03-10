import { Credentials, AuthService } from './../../core/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ra-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  message: string;

  constructor(private auth: AuthService) {}

  ngOnInit() {}

  login(credentials: Credentials) {
    this.message = '';
    this.auth.login(credentials).then(
      userCredential => {
        console.log(userCredential);
      },
      error => {
        if (error.code === 'auth/user-not-found') {
          this.message = 'This email has not been registered.';
        } else {
          this.message = error.message;
        }
        console.log(error.message);
      }
    );
  }
}
