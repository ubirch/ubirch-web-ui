import { Injectable } from '@angular/core';
import {DeviceStub} from '../models/device-stub';
import {Observable, of} from 'rxjs';
import {Device} from '../models/device';
import {FormGroup} from '@angular/forms';
import {UbirchWebUIUtilsService} from '../utils/ubirch-web-uiutils.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {DeviceTypeService} from './device-type.service';
import {CreateDevicesFormData} from '../tabs/devices/devices-list-page/popups/new-device-popup/new-device-popup.component';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
    url = environment.serverUrl + environment.apiPrefix;
    devicesUrl = this.url + 'devices';  // URL to web api to access devices

  constructor(
      private utils: UbirchWebUIUtilsService,
      private deviceTypeService: DeviceTypeService,
      private http: HttpClient
  ) { }


    public reloadDeviceStubs(pageNum?: number, pageSize?: number): Observable<DeviceStub[]> {
    const url = UbirchWebUIUtilsService.addParamsToURL(
        this.devicesUrl,
        pageNum,
        pageSize);

    return this.http.get<DeviceStub[]>(url).pipe(
        map(jsonDeviceStubs => jsonDeviceStubs.map(stub => new DeviceStub(stub))));
    }

    public loadDevice(id: string): Observable<Device> {
        const url = `${this.devicesUrl}/${id}`;
        return this.http.get<Device>(url).pipe(
            map(jsonDevice => new Device(jsonDevice)));
    }

    public createDevicesFromData(data: CreateDevicesFormData): Observable<Map<string, string>> {
      const devicesArray: Device[] = this.data2Devices(data);
      return this.createDevices(devicesArray);
    }

    public createDevices(devices: Device[]): Observable<Map<string, string>> {
        const url = `${this.devicesUrl}`;
        return this.http.post<Device[]>(url, devices).pipe(
            map(jsonDevices => {
                const deviceStates: Map<string, string> = new Map();
                jsonDevices.forEach(deviceState =>
                    deviceStates.set(
                        Object.keys(deviceState)[0],
                        deviceState[Object.keys(deviceState)[0]].state));
                return deviceStates;

            }));
    }

    public deleteDevice(id: string): Observable<boolean> {
        const url = `${this.devicesUrl}/${id}`;
        return this.http.delete<Device>(url).pipe(
            map(_ => true),
            catchError( _ => of(false)));
    }

    public updateDeviceFromData(data: FormGroup): Observable<Device> {
      if (data && data.value) {
          const device = new Device(data.value);
          if (device && device.hwDeviceId) {
              return this.updateDevice(device);
          } else {
              return of(null);
          }
      }
    }

    public updateDevice(device: Device): Observable<Device> {
      // TODO: before sending a device stringify every property that is here an object but a string on the other side
        const url = `${this.devicesUrl}/${device.hwDeviceId}`;
        return this.http.put<Device>(url, device).pipe(
            map(jsonDevice => new Device(jsonDevice)),
            catchError( _ => of(null)));

    }

  storeUnsavedChangesOfDevice(val: any): boolean {
    // TODO: how will we store changes of device before saving it?
    return true;
  }

    private data2Devices(data: CreateDevicesFormData): Device[] {
        const devicesArray: Device[] = [];
        if (data && data.hwDeviceId) {
            const hwDeviceIds = data.hwDeviceId.split(',');
            hwDeviceIds.forEach(id => {
                data.hwDeviceId = id.trim();
                if (data.hwDeviceId && data.hwDeviceId.length > 0) {
                    const device = new Device(data);
                    if (device) {
                        devicesArray.push(device);
                    }
                }
            });
        }
        return devicesArray;

    }

}
