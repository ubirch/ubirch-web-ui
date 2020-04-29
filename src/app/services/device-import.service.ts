import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceImportService {
  url = environment.serverUrl + environment.apiPrefix;
  deviceUrl = this.url + 'devices';
  importUrl = this.deviceUrl + '/batch';

  constructor(private http: HttpClient) { }

  public importDevice(formData: FormData) {
    return this.http.post(this.importUrl, formData);
  }
}
