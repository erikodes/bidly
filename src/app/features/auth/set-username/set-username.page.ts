import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-set-username',
  templateUrl: './set-username.page.html',
  styleUrls: ['./set-username.page.scss'],
})
export class SetUsernamePage implements OnInit {
  username: any;

  constructor(
    public api: FirebaseService,
    private auth: AuthService,
    public router: Router,
    public utils: UtilsService
  ) { }

  ngOnInit() {
  }

  setUsername() {
    console.log(this.auth.user);

    this.api.updateDocument(`users`, this.auth.user.id, {
      username: this.username
    }).then(() => {
      this.router.navigate([''], { replaceUrl: true, clearHistory: true } as NavigationExtras).then(() => {
        this.utils.presentToast('Bienvenido a Bidly @' + this.username)
      });
    })
  }

}
