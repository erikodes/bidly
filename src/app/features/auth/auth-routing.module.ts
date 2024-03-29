import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from 'src/app/guards/no-auth/no-auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [NoAuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomePageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
      },
      {
        path: 'set-username',
        loadChildren: () => import('./set-username/set-username.module').then(m => m.SetUsernamePageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }