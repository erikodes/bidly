import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    public toastController: ToastController
  ) { }


  buttonLoad(ev: any, show = true) {
    if (show) {
      ev.srcElement.innerHTML += '<ion-spinner name="crescent"></ion-spinner>';
      ev.srcElement.setAttribute('loading', 'true');
    } else {
      let text = ev.srcElement.innerText;
      ev.srcElement.setAttribute('loading', 'false');
      ev.srcElement.innerHTML = text;
    }
  }

  async presentToast(message: any, type: any = 'success', position: 'top' | 'middle' | 'bottom' = 'top') {
    let icon = 'checkmark-circle';
    if (type == 'error') {
      icon = 'close-circle';
    }

    const toast = await this.toastController.create({
      icon,
      message: message,
      cssClass: type,
      duration: 1500,
      position: position,
      htmlAttributes: { tabindex: undefined }
    });

    await toast.present();
  }


}
