import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {ToastType} from '../enums/toast-type.enum';
import {TranslateService} from '@ngx-translate/core';
import {LoggingService} from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private defaultMessage = 'Error occurred';

  constructor(
    private toastCtrl: ToastController,
    private translation: TranslateService,
    private logger: LoggingService
  ) { }

  public async openToast(toastTypeP: ToastType = ToastType.light,
                         messageKeyP: string,
                         durationP: number = 10000,
                         detailsP?: string,
                         messageParams?: any,
                         icon?: string) {
    await this.translation.get(messageKeyP, messageParams).toPromise().then(async messageLang => {
      if (!messageLang) {
        this.logger.warn('Missing language key for: ' + messageKeyP);
      }
      let toastLabel = messageLang || messageKeyP || this.defaultMessage;
      if (icon) {
        toastLabel = '<ion-icon src="' + icon + '"></ion-icon>    ' + toastLabel;
      }
      const content = {
        message: toastLabel,
        duration: durationP,
        color: toastTypeP
      };

      if (detailsP) {
        content.message = content.message + ': ' + detailsP;
      }
      const toast = await this.toastCtrl.create(content);
      toast.present();

      this.logger.logToast(toastTypeP, messageLang);
      }
    );
  }
}
