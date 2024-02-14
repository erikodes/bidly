import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { FirebaseService } from '../firebase/firebase.service';
import { UtilsService } from '../utils/utils.service';
import { Observable, filter, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any = null;

  constructor(
    private auth: Auth,
    public api: FirebaseService,
    public utils: UtilsService
  ) {
    authState(this.auth).subscribe(user => {
      if (user && !this.user) {
        this.api.getDocument('users', user.uid).subscribe(userData => {
          this.user = userData;
        });
      } else {
        this.user = null;
        console.log('aaaaaa');

      }
    })
  }

  isLoggedIn(): Observable<boolean> {
    return authState(this.auth).pipe(
      map(user => !!user) // Convierte el usuario en un booleano
    );
  }


  login(email: any, password: any) {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(this.auth, email, password).then(user_data => {
        this.api.getDocument(`users`, user_data.user.uid).subscribe(user => {
          this.user = user;
          this.utils.presentToast('Bienvenido @' + this.user.username);
          resolve(true);
        })
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
        reject();
      });
    })
  }

  registerUser(user_data: any) {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(this.auth, user_data.email, user_data.password).then(userCredential => {
        delete user_data.password;
        user_data.username = null;
        this.api.setDocument(`users`, userCredential.user.uid, user_data).then(() => {
          this.user = user_data;
          this.user.id = userCredential.user.uid;
          resolve(true);
        }, err => {
          reject()
        });
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
        reject()
      });
    })
  }

  // isLoggedIn(): boolean {
  //   return user !== null && user.emailVerified !== false ? true : false;
  // }

  logout() {
    signOut(this.auth).then(() => {
      alert('se cerro')
    });
  }
}