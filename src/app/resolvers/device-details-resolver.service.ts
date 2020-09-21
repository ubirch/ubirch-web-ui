import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {catchError} from 'rxjs/operators';

import {DeviceService} from '../services/device.service';
import {ToastService} from '../services/toast.service';
import {ToastType} from '../enums/toast-type.enum';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetailsResolverService implements Resolve<any> {

  constructor(
    private router: Router,
    private deviceService: DeviceService,
    private toast: ToastService,
  ) {
  }

  resolve(next: ActivatedRouteSnapshot) {
    const id = next.paramMap.get('id');

    if (id) {
      return this.loadDevice(id);
    } else {
      // handle url missmatch!!!!
      this.handleError('error.device.details.called-without-id');
    }
    return null;
  }

  private loadDevice(id: string) {
    return this.deviceService.loadDevice(id)
      .pipe(catchError(err => {
        // handle url missmatch!!!!
        if (err && err.error && err.error.error) {
          switch (err.error.error.error_type) {
            case 'Bad hwDeviceId':
              this.handleError('error.be.Bad hwDeviceId', {deviceid: id});
              break;
            default:
              this.handleError(err.error.error.message);
          }
        } else {
          this.handleError(err.message, {id}, err);
        }
        throw err;
      }));
  }

  private async handleError(messageKey: string, params?: any, err?: Error) {
    this.toast.openToast(ToastType.danger, messageKey, 10000, err ? err.message : undefined, params);
    this.router.navigate(['devices']);
  }
}
