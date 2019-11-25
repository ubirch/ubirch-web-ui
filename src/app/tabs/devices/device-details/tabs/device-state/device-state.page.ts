import {Component, OnInit} from '@angular/core';
import {forkJoin, interval, Observable, of, Subscription} from 'rxjs';
import {environment} from '../../../../../../environments/environment';
import {startWith, switchMap} from 'rxjs/operators';
import {DeviceService} from '../../../../../services/device.service';
import {Device} from '../../../../../models/device';
import {DeviceState, TIME_RANGES} from '../../../../../models/device-state';

@Component({
  selector: 'app-device-state',
  templateUrl: './device-state.page.html',
  styleUrls: ['./device-state.page.scss'],
})
export class DeviceStatePage implements OnInit {

  polling = new Subscription();

  loadedDevice: Device;
  errorMessage: string;

  deviceStateNames: Map<number, string> = new Map([
    [TIME_RANGES.MINUTE, 'Minute'],
    [TIME_RANGES.HOUR, 'Hour'],
    [TIME_RANGES.DAY, 'Day']
  ]);
  deviceStates: Map<number, DeviceState> = new Map<number, DeviceState>();

  constructor(
    private deviceService: DeviceService
  ) { }

  ionViewWillEnter() {
    this.restartPolling();
  }

  ngOnInit() {
    this.deviceService.observableCurrentDevice
      .subscribe(
        loadedDevice =>  {
          this.loadedDevice = loadedDevice;
          this.restartPolling();
        }
      );
  }

  ionViewWillLeave() {
    this.stopPolling();
  }

  private restartPolling() {
    this.stopPolling();

    this.polling = interval(environment.POLLING_INTERVAL_MILLISECONDS)
      .pipe(
        startWith(0),
        switchMap(() => {
          if (this.loadedDevice && this.loadedDevice.hwDeviceId) {

            const observableList: Observable<DeviceState[]>[] = [];
            const endDate = new Date();
            const startDates =  [
              new Date(endDate.getTime() - TIME_RANGES.DAY),
              new Date(endDate.getTime() - TIME_RANGES.HOUR),
              new Date(endDate.getTime() - TIME_RANGES.MINUTE)
            ];
            startDates.forEach(startDate =>
                observableList.push(this.deviceService.getDeviceStates([
                  this.loadedDevice.hwDeviceId],
                  startDate,
                  endDate
                ))
            );

            // load states
            return forkJoin(observableList);
          } else {
            return of(null);
          }
        })
      )
      .subscribe(
        deviceStatesLists =>
          // list of lists of deviceStates
          deviceStatesLists.map(
            deviceStates => {
              const stateOfCurrent = deviceStates.filter(state => state.hwDeviceId === this.loadedDevice.hwDeviceId);
              if (stateOfCurrent) {
                stateOfCurrent.forEach(state => {
                  const range = state.to - state.from;
                  this.deviceStates.set(range, state);
                });
              }
            }),
          error => this.errorMessage = 'State of thing unavailable'
          );
  }

  public getNumberOfUPPs(range: number): number {
    const val = this.deviceStates.get(range);
    return val ? val.numberUPPs : undefined;
  }

  public get TIME_RANGES(): any {
    return TIME_RANGES;
  }

  private stopPolling() {
    if (this.polling) {
      this.polling.unsubscribe();
    }
  }

}
