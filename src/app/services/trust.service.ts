import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {PubKeyInfo} from '../models/pub-key-info';
import {Observable} from 'rxjs';
import {Upp} from '../models/upp';

@Injectable({
  providedIn: 'root'
})
export class TrustService {

  public API_URL = environment.trustServiceServerUrl + environment.verifyApiPrefix;
  private getAnchor = 'anchor';
  private getRecord = 'record';
  private withPathSuffix = new HttpParams().set('response_form', 'anchors_with_path');
  private withoutPathSuffix = new HttpParams().set('response_form', 'anchors_no_path');

  constructor(
      private http: HttpClient
  ) { }

  public verifyByHash(vHash: string): Observable<any> {
    const url = this.API_URL + this.getRecord;
    return this.http.post<any>(url, vHash, { params: this.withPathSuffix }).pipe(
      tap(verification => console.log(`hash verified: ${verification}`)),
      map(jsonHashVerification =>
        new Upp(jsonHashVerification)
      ),
      catchError(err => {
        console.log(`hash cannot be verified: ${err}`);
        return null;
      })
    );
  }
}
