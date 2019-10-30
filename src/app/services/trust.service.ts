import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrustService {

  verifyApiUrl = environment.trustServiceServerUrl + environment.verifyApiPrefix;


  constructor(
      private http: HttpClient
  ) { }

  public verifyByHash(vHash: string): any {
    return null;
  }
}
