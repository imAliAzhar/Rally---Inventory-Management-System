import { SignupCredentials } from './../../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../login/login.component.sass']
})
export class RegisterComponent implements OnInit {
  message: string;

  constructor(private auth: AuthService) {}

  register(credentials: SignupCredentials) {
    this.message = '';
    if (credentials.password != credentials.password2) {
      this.message = 'Passwords do not match.';
    } else {
      this.auth.createAccount(credentials).then(
        userCredential => {
          console.log(userCredential);
        },
        error => {
          this.message = error.message;
          console.log(this.message);
        }
      );
    }
  }
  ngOnInit() {}
}
