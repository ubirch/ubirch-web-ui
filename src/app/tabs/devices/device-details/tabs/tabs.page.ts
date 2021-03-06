import {Component, OnInit} from '@angular/core';
import {DeviceService} from 'src/app/services/device.service';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

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
      const allowedTag = this.deviceService.getAllowedCaimingTagsOfDevice(device);
      return !!allowedTag;
    }),
  );

  ngOnInit() {
  }

}
