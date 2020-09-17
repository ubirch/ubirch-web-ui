import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {ToastType} from '../enums/toast-type.enum';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private defaultMessage = 'Error occurred';

  constructor(
    private toastCtrl: ToastController,
    private translation: TranslateService
  ) { }

  public async openToast(toastTypeP: ToastType = ToastType.light, messageKeyP: string, durationP: number = 100000, detailsP?: string) {
    await this.translation.get(messageKeyP).toPromise().then(async messageLang => {
      const content = {
        message: messageLang || this.defaultMessage,
        duration: durationP,
        color: toastTypeP
      };

      if (detailsP) {
        content.message = content.message + ': ' + detailsP;
      }
      const toast = await this.toastCtrl.create(content);
      toast.present();
      }
    );
  }
}
