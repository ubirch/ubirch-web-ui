import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { DeviceService } from '../services/device.service';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {BEDevice} from '../models/bedevice';

@Injectable({
  providedIn: 'root'
})
export class DeviceDataResolverService implements Resolve<any> {

  constructor(private deviceService: DeviceService, private router: Router) { }

  resolve(): Observable<void> {
    return this.deviceService.observableCurrentDevice.pipe(
      take(1),
      tap((device: BEDevice) => {
        if (!this.deviceService.getAllowedCaimingTagsOfDevice(device)) {
          this.router.navigate(['devices', 'details', device.hwDeviceId, 'settings']);
        }
      }),
      map(() => {}),
    );
  }
}
