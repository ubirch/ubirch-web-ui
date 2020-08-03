import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {ToastController} from '@ionic/angular';

import {DeviceService} from '../services/device.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetailsResolverService implements Resolve<any> {
  toastrContent: Map<string, any> = new Map([
    ['err', {
      message: 'Error occurred',
      duration: 10000,
      color: 'danger'
    }]
  ]);

  constructor(
    private router: Router,
    private deviceService: DeviceService,
    private toastCtrl: ToastController,
  ) {
  }

  resolve(next: ActivatedRouteSnapshot) {
    const id = next.paramMap.get('id');

    if (id) {
      return this.loadDevice(id);
    } else {
      // handle url missmatch!!!!
      this.finished('err', 'things details url called without ID');
    }
    return null;
  }

  private loadDevice(id: string) {
    return this.deviceService.loadDevice(id)
      .pipe(catchError(err => {
        // handle url missmatch!!!!
        this.finished('err', 'things details url called without ID');
        throw err;
      }));
  }

  private async finished(param: string, details?: string) {
    const content = this.toastrContent.get(param);
    if (details && content && content.message) {
      content.message = content.message + ': ' + details;
    }
    const toast = await this.toastCtrl.create(content);
    toast.present();
    console.log(content.message);
    this.router.navigate(['devices']);
  }
}
