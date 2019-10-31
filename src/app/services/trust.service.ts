import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {PubKeyInfo} from '../models/pub-key-info';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrustService {

  public API_URL = environment.trustServiceServerUrl + environment.verifyApiPrefix;


  constructor(
      private http: HttpClient
  ) { }

  public verifyByHash(vHash: string): Observable<any> {
    return this.http.post<any>(this.API_URL, vHash).pipe(
      tap(verification => console.log(`hash verified: ${verification}`)),
      map(jsonHashVerification =>
        jsonHashVerification
      ),
      catchError(err => {
        console.log(`hash cannot be verified: ${err}`);
        return null;
      })
    );
  }
}
