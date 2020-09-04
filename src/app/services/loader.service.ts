import { Injectable } from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private status: 'pending' | 'dismissed' | 'present' = 'dismissed';

  constructor(public loadingCtrl: LoadingController) {}

  public show() {
    if (this.status === 'present') {
      this.hide();
    }

    this.status = 'pending';

    this.loadingCtrl.create({
      id: 'general-loader',
      message: 'Loading your Things'
    })
      .then((loader) => loader.present())
      .then(() => {
        if (this.status === 'pending') {
          this.status = 'present';
        } else {
          this.hide();
        }
      });
  }

  public hide() {
    this.loadingCtrl
      .dismiss(null, undefined, 'general-loader')
      .catch((err) => console.log('Loader error!', err))
      .then(() => this.status = 'dismissed');
  }
}
