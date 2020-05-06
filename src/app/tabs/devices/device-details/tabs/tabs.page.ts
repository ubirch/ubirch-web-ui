import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/services/device.service';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(private deviceService: DeviceService) { }

  currentDevice$ = this.deviceService.observableCurrentDevice;

  showDataTab$: Observable<boolean> = this.currentDevice$.pipe(
    filter(device => !!device),
    map(device => {
      const allowedTag = device.claimingTags.find(tag => {
        return environment.deviceData.panelMap[tag];
      });

      return !!allowedTag;
    }),
  );

  ngOnInit() {
  }

}
