import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

export enum MessageType {
  ERROR = "danger",
  SUCCESS = "success"
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }

  async presentMessage(msg: string, msgType: MessageType) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: msgType,
      showCloseButton: true,
      closeButtonText: 'Fechar'
    });
    toast.present();
  }
}
