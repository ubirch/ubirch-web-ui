import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { DeviceService } from '../services/device.service';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceDataResolverService implements Resolve<any> {

  constructor(private deviceService: DeviceService, private router: Router) { }

  resolve(): Observable<void> {
    return this.deviceService.observableCurrentDevice.pipe(
      take(1),
      tap(device => {
        const allowedTag = device.claimingTags.find(tag => {
          return environment.deviceData.panelMap[tag];
        });

        if (!allowedTag) {
          this.router.navigate(['devices', 'details', device.hwDeviceId, 'settings']);
        }
      }),
      map(() => {}),
    );
  }
}
