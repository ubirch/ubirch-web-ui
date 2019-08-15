import { Injectable } from '@angular/core';
import {DeviceType} from '../models/device-type';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {filter, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeviceTypeService {

  static deviceTypes: Map<string, DeviceType>;

  constructor(
      private http: HttpClient
  ) { }

  public static getDeviceType(type: string): Observable<DeviceType> {
    if (! DeviceTypeService.deviceTypes) {
      return this.getAllDeviceTypes().pipe(
          tap(deviceTypes => {
            DeviceTypeService.deviceTypes = new Map();
            deviceTypes.forEach(deviceType => DeviceTypeService.deviceTypes.set(deviceType.key, deviceType));
          }),
          map(deviceTypes => {
            const found = deviceTypes.filter(deviceType => deviceType.key === type);
            if (found) {
              return found[0];
            }
          })
      );
    } else {
      return of(DeviceTypeService.deviceTypes.get(type));
    }
  }

  static getAllDeviceTypes(): Observable<DeviceType[]> {
    // TODO: connect with deviceTypes API endpoint
    const inputs: DeviceType[] = [];
    inputs.push(new DeviceType('{"key": "default_type","name": { "de": "Testsensor","en": "test sensor"}, "iconId": "happy"}'));
    inputs.push(new DeviceType( '{"key":"light_sensor","name":{"de":"Helligkeitssensor","en":"light sensor"},' +
    '"iconFileName":"ion-sensor-type-light.svg"}'));
    inputs.push(new DeviceType( '{"key":"thermal_sensor","name":{"de":"Temperatursensor","en":"thermal sensor"},' +
    '"iconId":"thermometer"}'));
    inputs.push(new DeviceType('{"key": "elevator_fail_detection","name": { "de": "Fahrstuhlsensor","en": "elevator sensor"},' +
    '"iconId": "sad"}'));


    return of(inputs);
  }


}
