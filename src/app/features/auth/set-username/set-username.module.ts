import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetUsernamePageRoutingModule } from './set-username-routing.module';

import { SetUsernamePage } from './set-username.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetUsernamePageRoutingModule
  ],
  declarations: [SetUsernamePage]
})
export class SetUsernamePageModule {}
