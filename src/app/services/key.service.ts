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

  /**
   * compare fkt: a pubKey pk1 comes before another pubKey pk2 if pk1.validNotAfter > pk2.validNotAfter (validUntil is later)
   * @param pk1 first pubKey that should be compared
   * @param pk2 second pubKey that should be compared
   */
  public static compareKeys(pk1: PubKeyInfo, pk2: PubKeyInfo): number {
    if (pk1 && pk2 && pk1.validNotAfter && pk2.validNotAfter) {
      if (pk1.validNotAfter > pk2.validNotAfter) {
        return -1;
      }
      if (pk1.validNotAfter < pk2.validNotAfter) {
        return 1;
      }
      return 0;
    } else {
      return 0;
    }
  }

  /**
   * get list of pubKeys registered for a thing from ubirch key server
   * @param id hwDeviceId of the thing
   */
  public getPubKeysOfThing(id: string): Observable<PubKeyInfo[]> {
    const url = `${this.pubKeyUrl}/${id}`;
    return this.http.get<any>(url).pipe(
        map(jsonPubKeyList =>
            jsonPubKeyList.map(jsonPubKey =>
                new PubKeyInfo(jsonPubKey)))
    );
  }
}
