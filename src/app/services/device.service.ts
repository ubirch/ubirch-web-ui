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
import {DevicesListWrapper} from '../models/devices-list-wrapper';

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

    /**
     * load a couple of deviceStubs for the list of devices; pagination included
     * @param pageNum number of the page for pagination
     * @param pageSize how many devices are maximal paged
     */
    public reloadDeviceStubs(pageNum?: number, pageSize?: number): Observable<DeviceStub[]> {
    const url = UbirchWebUIUtilsService.addParamsToURL(
        this.devicesUrl,
        pageNum,
        pageSize);

    return this.http.get<DevicesListWrapper[]>(url).pipe(
        map(listWrapper => {
            const wrapper = new DevicesListWrapper(listWrapper);
            return wrapper.devices;
        }));
    }

    /**
     * load device
     * @param id hwDeviceId of the device that should be loaded
     */
    public loadDevice(id: string): Observable<Device> {
        const url = `${this.devicesUrl}/${id}`;
        return this.http.get<Device>(url).pipe(
            map(jsonDevice => new Device(jsonDevice)));
    }

    /**
     * create devices from form fields, containing a list of hwDeviceIds, a deviceType and (optionally) a description
     * All created devices get the same description and deviceType
     * @param data of type CreateDevicesFormData: containing a list of hwDeviceIds, a deviceType and (optionally) a description.
     * Returns a Map, containing the hwDeviceIds and the state of creation: "OK" if successfully created
     */
    public createDevicesFromData(data: CreateDevicesFormData): Observable<Map<string, string>> {
      const devicesArray: Device[] = this.data2Devices(data);
      return this.createDevices(devicesArray);
    }

    /**
     * bulk creation of a list of devices
     * @param list of devices to be registered in backend
     * Returns a Map, containing the hwDeviceIds and the state of creation: "OK" if successfully created
     */
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

    /**
     * delete device
     * we assume that user already confirmed the deletion
     * @param id of the device that shall be deleted
     */
    public deleteDevice(id: string): Observable<boolean> {
        const url = `${this.devicesUrl}/${id}`;
        return this.http.delete<Device>(url).pipe(
            map(_ => true),
            catchError( _ => of(false)));
    }

    /**
     * if device already loaded, the current loaded device is patched with form data;
     * if no item
     * @param data form data, containing several device properties
     */
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
