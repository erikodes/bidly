import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase/firebase.service';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user_key: any;

  constructor(
    private auth: Auth,
    public router: Router,
    public api: FirebaseService,
    public utils: UtilsService
  ) { }

  login(email: any, password: any) {
    return signInWithEmailAndPassword(this.auth, email, password).then(data => {
      this.utils.presentToast('Iniciaste sesion');
    }).catch(err => {
      let errorMessage: string;
      switch (err.code) {
        case 'auth/invalid-email':
          errorMessage = 'Correo electrónico inválido';
          break;
        case 'auth/user-disabled':
          errorMessage = 'Usuario deshabilitado';
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = 'Credenciales inválidas';
          break;
        default:
          errorMessage = 'Error de inicio de sesión.';
          break;
      }
      this.utils.presentToast(errorMessage, 'error');
    });
  }

  registerUser(user_data: any) {
    return createUserWithEmailAndPassword(this.auth, user_data.email, user_data.password).then(userCredential => {
      this.user_key = userCredential.user.uid;
      delete user_data.password;
      this.api.setDocument(`users`, this.user_key, user_data).then(() => {
        this.router.navigate(['/auth/set-username']);
      })
    }).catch(err => {
      let errorMessage: string;
      switch (err.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'El correo electrónico ya está en uso.';
          break;
        case 'auth/weak-password':
          errorMessage = 'La contraseña es débil. Debe tener al menos 6 caracteres.';
          break;
        default:
          errorMessage = 'Error al registrarse. Por favor, intenta nuevamente.';
          break;
      }
      this.utils.presentToast(errorMessage, 'error');
    });
  }

  // isLoggedIn(): boolean {
  //   return user !== null && user.emailVerified !== false ? true : false;
  // }

  logout() {
    alert('bye')
  }
}