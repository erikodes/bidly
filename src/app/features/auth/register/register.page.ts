import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    public api: FirebaseService,
    public utils: UtilsService,
    public router: Router
  ) { }

  ngOnInit() {
    this.registroForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      terms: [false, Validators.requiredTrue]
    });
  }

  register(event: any) {
    this.utils.buttonLoad(event);
    this.auth.registerUser(this.registroForm.value).then(() => {
      this.router.navigate(['/auth/set-username']);
    }, err => {
      this.utils.buttonLoad(event, false);
    });
  }
}
