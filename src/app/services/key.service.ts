import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {PubKeyInfo} from '../models/pub-key-info';

@Injectable({
  providedIn: 'root'
})
export class KeyService {

  pubKeyUrl = environment.keyServiceServerUrl + environment.keyServiceApiPrefix + 'pubkey/current/hardwareId';

  constructor(
      private http: HttpClient
  ) { }

  public getPubKeysOfThing(id: string): Observable<PubKeyInfo[]> {
    const url = `${this.pubKeyUrl}/${id}`;
    return this.http.get<any>(url).pipe(
        map(jsonPubKeyList =>
            jsonPubKeyList.map(jsonPubKey =>
                new PubKeyInfo(jsonPubKey)))
    );
  }
}
