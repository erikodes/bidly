import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-set-username',
  templateUrl: './set-username.page.html',
  styleUrls: ['./set-username.page.scss'],
})
export class SetUsernamePage implements OnInit {
  username: any;

  constructor(
    public api: FirebaseService,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  setUsername() {
    this.api.updateDocument(`users`, this.auth.user_key, {
      username: this.username
    }).then(() => {
      alert('bienvenido');
    })
  }

}
