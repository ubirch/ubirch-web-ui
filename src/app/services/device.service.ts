import { Injectable } from '@angular/core';
import {DeviceStub} from '../models/device-stub';
import {Observable, of} from 'rxjs';
import {Device} from '../models/device';
import {FormGroup} from '@angular/forms';
import {UbirchWebUIUtilsService} from '../utils/ubirch-web-uiutils.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {DeviceTypeService} from './device-type.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
    url = environment.serverUrl + environment.apiPrefix;
    deviceStubsUrl = this.url + 'devices/getDevicesUser';  // URL to web api to access a list of itemStubs for lists
    oneDeviceUrl = this.url + 'devices/getOneDevice';

    private inputs: any[] = [];

  constructor(
      private utils: UbirchWebUIUtilsService,
      private deviceTypeService: DeviceTypeService,
      private http: HttpClient
  ) {
    this.inputs.push({
        id: '7895ef02-e735-4d60-9405-8907afd16a1c',
        hwDeviceId: '5c38ea3f-a2c7-47b7-811a-1a8f980e9364',
        description: 'Ates Testdevice 1',
        deviceType: '{"key": "default_type","name": { "de": "Testsensor","en": "test sensor"}, "iconId": "happy"}',
        owner: {
          id: 'd489eaf0-268b-4336-9e9d-daea62c5d0ac',
          username: 'testuser',
          lastname: 'Testa',
          firstname: 'Rosa'
        },
        groups: [],
        deviceConfig: '{"i": 900,"th": 3600}',
        apiConfig: '{"url": "https://test.test.de","password": "802921c2-a2e7-4d8f-b828-1c5aee2d3c38"}'
    });
    this.inputs.push({
          id: '562237ce-da95-4a8f-9772-bd4ca119cfc5',
          hwDeviceId: 'c1e7b024-7314-4785-ab7a-dea0185256a9',
          description: 'Ates Testdevice 2',
          deviceType: '{"key":"light_sensor","name":{"de":"Helligkeitssensor","en":"light sensor"},' +
              '"iconFileName":"ion-sensor-type-light.svg"}',
          owner: {
              id: 'd489eaf0-268b-4336-9e9d-daea62c5d0ac',
              username: 'testuser',
              lastname: 'Testa',
              firstname: 'Rosa'
          },
          groups: [],
          deviceConfig: '{"i": 300,"th": 2500}',
          apiConfig: '{"url": "https://test.test.de","password": "802921c2-a2e7-4d8f-b828-1c5aee2d3c38"}'
    });
    this.inputs.push({
          id: '562237ce-da95-4a8f-9772-bd4ca119cfc5',
          hwDeviceId: 'c1e7b024-7314-4785-ab7a-dea0185256a9',
          description: 'Ates Testdevice 2',
          deviceType: '{"key":"thermal_sensor","name":{"de":"Temperatursensor","en":"thermal sensor"},' +
              '"iconId":"thermometer"}',
          owner: {
              id: 'd489eaf0-268b-4336-9e9d-daea62c5d0ac',
              username: 'testuser',
              lastname: 'Testa',
              firstname: 'Rosa'
          },
          groups: [],
          deviceConfig: '{"i": 300,"th": 2500}',
          apiConfig: '{"url": "https://test.test.de","password": "802921c2-a2e7-4d8f-b828-1c5aee2d3c38"}'
      });
  }


  public reloadDeviceStubs(pageNum?: number, pageSize?: number): Observable<DeviceStub[]> {
    const url = UbirchWebUIUtilsService.addParamsToURL(
        this.deviceStubsUrl,
        pageNum,
        pageSize);

    return this.http.get<DeviceStub[]>(url).pipe(
        map(jsonDeviceStubs => jsonDeviceStubs.map(stub => new DeviceStub(stub))));
  }

  public loadDevice(id: string): Observable<Device> {
      const url = `${this.oneDeviceUrl}/${id}`;
      return this.http.get<Device>(url).pipe(
          map(jsonDevice => new Device(jsonDevice)));
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
