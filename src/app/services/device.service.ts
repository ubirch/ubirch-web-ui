import { Injectable } from '@angular/core';
import {DeviceStub} from '../models/device-stub';
import {Observable, of} from 'rxjs';
import {Device} from '../models/device';
import {FormGroup} from '@angular/forms';
import {DeviceType} from '../models/device-type';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

    private inputs: any[] = [];

  constructor() {
    this.inputs.push({
        id: '7895ef02-e735-4d60-9405-8907afd16a1c',
        hwDeviceId: '5c38ea3f-a2c7-47b7-811a-1a8f980e9364',
        description: 'Ates Testdevice 1',
        deviceType: '{"key": "testSensor","name": { "de": "Testsensor","en": "test sensor"}, "iconId": "happy"}',
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
          deviceType: '{"key":"lightSensor","name":{"de":"Helligkeitssensor","en":"light sensor"},' +
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
  }

    public getAllDeviceTypes(): Observable<DeviceType[]> {
      return of(this.inputs.map(item => new DeviceType(item.deviceType)));
    }


    public reloadDeviceStubs(pageNum?: number, pageSize?: number): Observable<DeviceStub[]> {
      return of(this.inputs.map(item => new DeviceStub(item)));
  }

  public loadDevice(id: string): Observable<Device> {
      const foundDevices = this.inputs.filter(device => device.hwDeviceId === id );
      if (foundDevices && foundDevices[0]) {
          return of(foundDevices[0]);
      }
      return of(null);
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
