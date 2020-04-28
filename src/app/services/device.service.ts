import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {Device} from '../models/device';
import {FormGroup} from '@angular/forms';
import {UbirchWebUIUtilsService} from '../utils/ubirch-web-uiutils.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {DeviceTypeService} from './device-type.service';
import {CreateDevicesFormData, ReqType} from '../tabs/devices/devices-list-page/popups/new-device-popup/new-device-popup.component';
import {DevicesListWrapper} from '../models/devices-list-wrapper';
import {UserService} from './user.service';
import {isArray} from 'util';
import {DeviceState, TIME_RANGES} from '../models/device-state';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
    url = environment.serverUrl + environment.apiPrefix;
    devicesUrl = this.url + 'devices';  // URL to web api to access devices
    deviceStateUrl = this.url + 'devices/state';  // URL to web api to access the states of requested devices
    devicesCreateUrl = this.url + 'devices/elephants'; // URL to web api to create devices
    searchUrl = this.devicesUrl + '/search';  // URL to web api to search devices by hwDeviceId or description (substrings)

    private currentDevice: Device;
    private behaviorSubject = new BehaviorSubject<Device>(this.currentDevice);
    public observableCurrentDevice: Observable<Device> = this.behaviorSubject.asObservable();


    constructor(
      private utils: UbirchWebUIUtilsService,
      private deviceTypeService: DeviceTypeService,
      private userService: UserService,
      private http: HttpClient
  ) { }

    /**
     * load a couple of deviceStubs for the list of devices; pagination included, states fetched after list has been responded
     * @param pageNum number of the page for pagination
     * @param pageSize how many devices are maximal paged
     */
    public reloadDeviceStubs(pageNum?: number, pageSize?: number): Observable<DevicesListWrapper> {
      const url = UbirchWebUIUtilsService.addParamsToThingsListPaginationURL(
        this.devicesUrl,
        pageNum,
        pageSize);

      return this.http.get<DevicesListWrapper[]>(url).pipe(
        map(listWrapper => new DevicesListWrapper(listWrapper)),
        tap(listWrapper => {
          if (listWrapper && listWrapper.numberOfDevices) {
            this.userService.setNumberOfDevices(listWrapper.numberOfDevices);
          }
        }));
    }

    /**
     * Get states of devices
     * @param deviceIds array of deviceId for which the states should be requested for
     * @param from Date Object (optional) if given this is the end of the request range of time, states are request for; default: Date.now()
     * @param periode Date Object (optional) if given this is range of time, states are request for; default: 1 day
     */
    public getDeviceStates(deviceIds: string[], from?: Date, to?: Date): Observable<DeviceState[]> {
      if (deviceIds && isArray(deviceIds) && deviceIds.length > 0) {
        const endDate = to ? to : new Date();
        const startDate = from ? from : new Date(endDate.getTime() - TIME_RANGES.DAY);

        const url = UbirchWebUIUtilsService.addParamsToURL(
          this.deviceStateUrl,
          [ startDate.toISOString(),
            endDate.toISOString()
          ]
        );

        return this.http.post<DeviceState[]>(url, deviceIds.join()).pipe(
          map(
            jsonStates =>
            jsonStates.map(
              jsonState => new DeviceState(jsonState))
          )
        );
      } else {
        throw new Error(`getDeviceStates call without any deviceIds`);
      }
    }

    /**
     * return a list of devices where the hwDeviceId OR the description contains the given search string
     * @param searchStr substring to search for
     */
    public searchDevices(searchStr: string): Observable<DevicesListWrapper> {
        const url = `${this.searchUrl}/${searchStr}`;

        return this.http.get<DevicesListWrapper[]>(url).pipe(
            map(listWrapper => new DevicesListWrapper(listWrapper)),
            tap(listWrapper => {
                if (listWrapper && listWrapper.numberOfDevices) {
                    this.userService.setNumberOfDevices(listWrapper.numberOfDevices);
                }
            }));
    }

    /**
     * load device
     * @param id hwDeviceId of the device that should be loaded
     */
    public loadDevice(id: string): Observable<Device> {
        // reset currentLoaded device if it is a different one
        const current = this.behaviorSubject.getValue();
        if (current && current.hwDeviceId !== id) {
          this.behaviorSubject.next(null);
        }

        const url = `${this.devicesUrl}/${id}`;
        return this.http.get<Device>(url).pipe(
            map(jsonDevice => {
                    const respDevice = new Device(jsonDevice);
                    this.behaviorSubject.next(respDevice);
                    return respDevice;
                })
        );
    }

    /**
     * create devices from form fields, containing a list of hwDeviceIds, a deviceType and (optionally) a description
     * All created devices get the same description and deviceType
     * @param data of type CreateDevicesFormData: containing a list of hwDeviceIds, a deviceType and (optionally) a description.
     * Returns a Map, containing the hwDeviceIds and the state of creation: "OK" if successfully created
     */
    public createDevicesFromData(data: CreateDevicesFormData): Observable<Map<string, string>> {
      const devicesArray: Device[] = this.data2Devices(data);
      return this.createDevices(data.reqType, data.tags, data.prefix, devicesArray);
    }

    /**
     * bulk creation of a list of devices
     * @param list of devices to be registered in backend
     * Returns a Map, containing the hwDeviceIds and the state of creation: "OK" if successfully created
     */
    public createDevices(reqType: ReqType, tags: string, prefix: string, devices: Device[]): Observable<Map<string, string>> {
        const url = `${this.devicesCreateUrl}`;
        const payload = new CreateDevicePayload({ reqType, tags, prefix, devices });

        return this.http.post<any[]>(url, payload).pipe(
            map(jsonDevices =>
                this.extractDevicesCreationStates(jsonDevices)),
            catchError(error => {
                if (error.error && isArray(error.error)) {
                    return throwError(this.extractDevicesCreationStates(error.error, true));
                } else {
                    // server-side error
                    return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
                }
            }));
    }

    private extractDevicesCreationStates(jsonDevices: any[], errorOcc?: boolean): Map<string, string> {

        const deviceStates: Map<string, string> = new Map();

        jsonDevices.forEach(deviceState =>
            deviceStates.set(
                Object.keys(deviceState)[0],
                deviceState[Object.keys(deviceState)[0]].state === 'ok' ?  'ok' : deviceState[Object.keys(deviceState)[0]].error));
        return deviceStates;
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
            map(jsonDevice => {
                const respDevice = new Device(jsonDevice);
                this.behaviorSubject.next(respDevice);
                return respDevice;
            }),
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

class CreateDevicePayload {
  reqType: ReqType;
  tags?: string;
  prefix?: string;
  devices: Device[];
  
  constructor(props) {
    // remove empty strings, nulls or undefineds
    if (!props.tags) {
      delete props.tags;
    }
    if (!props.prefix) {
      delete props.prefix;
    }

    Object.assign(this, props);
    return this;
  }
}