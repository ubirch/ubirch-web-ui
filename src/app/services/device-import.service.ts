import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DeviceImportResult } from '../models/device-import-result';

@Injectable({
  providedIn: 'root'
})
export class DeviceImportService {
  url = environment.serverUrl + environment.apiPrefix;
  deviceUrl = this.url + 'devices';
  importUrl = this.deviceUrl + '/batch';

  constructor(private http: HttpClient) { }

  /**
   * send import device form
   * @param formData form value
   */
  public importDevice(formData: FormData): Observable<DeviceImportResult> {
    return this.http.post(this.importUrl, formData).pipe(
      map((res: IImportResponse) => new DeviceImportResult(res)),
    );
  }
}

export interface IImportResponse {
  accepted: number;
  failure: number;
  failures: string[];
  status: boolean;
  success: number;
}
