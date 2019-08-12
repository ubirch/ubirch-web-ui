import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DeviceService} from '../../../services/device.service';
import {Device} from '../../../models/device';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss'],
})
export class DeviceDetailsComponent implements OnInit {

  curDevice: Device;
  constructor(
      private route: ActivatedRoute,
      private deviceService: DeviceService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.deviceService.loadDevice(id)
        .subscribe(
            loadedDevice => this.curDevice = new Device(loadedDevice)
        );
    } else {
      // TODO: handle url missmatch!!!!
    }
  }
}
