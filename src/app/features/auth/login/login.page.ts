import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: any;
  password: any;
  constructor(
    public auth: AuthService
  ) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.email, this.password);
  }
}
