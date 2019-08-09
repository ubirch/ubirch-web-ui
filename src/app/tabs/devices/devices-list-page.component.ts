import { Component, OnInit } from '@angular/core';
import {DeviceStub} from '../../models/device-stub';
import {DeviceService} from '../../services/device.service';
import {interval, Subscription} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: 'devices-list-page.component.html',
  styleUrls: ['devices-list-page.component.scss']
})
export class DevicesListPage implements OnInit {
  private selectedItem: DeviceStub;
  public deviceStubs: Array<DeviceStub> = [];

  polling = new Subscription();

  // pagination params
  totalItems: number;
  currentPage = 1;
  ionite: string;

  constructor(
      private deviceService: DeviceService
  ) {}

  ngOnInit() {
    this.deviceService.reloadDeviceStubs()
        .subscribe(
            devices =>
                this.deviceStubs = devices
        );
    this.restartPolling();
  }

  private restartPolling() {
      this.stopPolling();

      this.polling = interval(environment.POLLING_INTERVAL_MILLISECONDS)
          .pipe(
              startWith(0),
              switchMap(() => this.deviceService.reloadDeviceStubs(
                  this.currentPage,
                  environment.LIST_ITEMS_PER_PAGE
              ))
          )
          .subscribe(
              devices =>
                  this.deviceStubs = devices
          );
  }

  private stopPolling() {
    if (this.polling) {
      this.polling.unsubscribe();
    }
  }

  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
