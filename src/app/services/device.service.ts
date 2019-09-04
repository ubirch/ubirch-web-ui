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
  ) {
      //   {
      //     id: '562237ce-da95-4a8f-9772-bd4ca119cfc5',
      //     hwDeviceId: 'c1e7b024-7314-4785-ab7a-dea0185256a9',
      //     description: 'Ates Testdevice 2',
      //     deviceType: '{"key":"thermal_sensor","name":{"de":"Temperatursensor","en":"thermal sensor"},' +
      //         '"iconId":"thermometer"}',
      //     owner: {
      //         id: 'd489eaf0-268b-4336-9e9d-daea62c5d0ac',
      //         username: 'testuser',
      //         lastname: 'Testa',
      //         firstname: 'Rosa'
      //     },
      //     groups: [],
      //     deviceConfig: '{"i": 300,"th": 2500}',
      //     apiConfig: '{"url": "https://test.test.de","password": "802921c2-a2e7-4d8f-b828-1c5aee2d3c38"}'
      // }
  }


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

    public createDevice(device: Device): Observable<Map<string, string>> {
      const devicesArray: Device[] = [];
      devicesArray.push(device);
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

    public updateDevice(deviceDetailsForm: FormGroup): Observable<Device> {
      // TODO: before sending a device stringify every property that is here an object but a string on the other side
      return of(null);
  }

  storeUnsavedChangesOfDevice(val: any): boolean {
    // TODO: how will we store changes of device before saving it?
    return true;
  }
}
