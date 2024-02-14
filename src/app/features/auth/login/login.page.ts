import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: any;
  password: any;
  constructor(
    public auth: AuthService,
    public utils: UtilsService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  login(event: any) {
    this.utils.buttonLoad(event);
    this.auth.login(this.email, this.password).then(() => {
      this.router.navigate([''], { replaceUrl: true, clearHistory: true } as NavigationExtras);
    }, err => {
      this.utils.buttonLoad(event, false);
    });
  }
}
