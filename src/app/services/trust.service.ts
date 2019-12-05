import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams, HttpResponseBase} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Upp} from '../models/upp';

export const VERIFICATION_STATE = {
  NO_HASH: 'NO_HASH',
  HASH_INSERTED_UNVERIFIED: 'HASH_INSERTED_UNVERIFIED',
  PENDING: 'PENDING',
  HASH_VERIFIED: 'HASH_VERIFIED',
  HASH_VERIFICATION_FAILED: 'HASH_VERIFICATION_FAILED',
  HASH_VERIFICATION_ERROR: 'HASH_VERIFICATION_ERROR',
  SERVICE_CURRENTLY_UNAVAILABLE: 'SERVICE_CURRENTLY_UNAVAILABLE'
};

@Injectable({
  providedIn: 'root'
})
export class TrustService {

  public API_URL = environment.trustServiceServerUrl + environment.verifyApiPrefix;
  private getRecord = 'record';
  private withPathSuffix = new HttpParams().set('response_form', 'anchors_with_path').set('blockchain_info', 'ext');
//  private getAnchor = 'anchor';
//  private withoutPathSuffix = new HttpParams().set('response_form', 'anchors_no_path');

  /**
   * Observable of current hash
   */
  private currHash: string;
  private bsHash = new BehaviorSubject<string>(this.currHash);
  public observableHash: Observable<string> = this.bsHash.asObservable();

  /**
   * Observable state of verification of current hash
   */
  private currHashVerficiationState = VERIFICATION_STATE.NO_HASH;
  private bsHashVerifyState = new BehaviorSubject<string>(this.currHashVerficiationState);
  public observableVerificationState: Observable<string> = this.bsHashVerifyState.asObservable();

  /**
   * Observable current UPP
   */
  private currUPP: Upp;
  private bsUPP = new BehaviorSubject<Upp>(this.currUPP);
  public observableUPP: Observable<Upp> = this.bsUPP.asObservable();

  constructor(
      private http: HttpClient
  ) { }

  public verifyByHash(vHash: string, update = true): Observable<boolean> {
    if (vHash && vHash.length > 0) {
      const url = this.API_URL + this.getRecord;
      this.handleState(VERIFICATION_STATE.PENDING, update ? vHash : undefined);
      return this.http.post<any>(url, vHash, { params: this.withPathSuffix }).pipe(
        map(jsonHashVerification => {
            const upp = new Upp(jsonHashVerification);
            upp.pureJSON = jsonHashVerification;
            if (upp) {
              return this.handleState(VERIFICATION_STATE.HASH_VERIFIED, update ? vHash : undefined, upp);
            } else {
              return this.handleState(VERIFICATION_STATE.HASH_VERIFICATION_FAILED, update ? vHash : undefined);
            }
          }
        ),
        catchError(error => {
          return of(this.handleError(error, update ? vHash : undefined));
        })
      );
    } else {
      return of(this.handleState(VERIFICATION_STATE.NO_HASH));
    }
  }

  private handleState(state: string, hash?: string, upp?: Upp): boolean {
    this.bsHashVerifyState.next(state);
    if (hash) {
      this.bsHash.next(hash);
    } else {
      if (this.bsHash.getValue() != null) {
        this.bsHash.next(null);
      }
    }
    if (upp) {
      this.bsUPP.next(upp);
    } else {
      if (this.bsUPP.getValue() != null) {
        this.bsUPP.next(null);
      }
    }
    switch (hash) {
      case VERIFICATION_STATE.HASH_VERIFIED:
        return true;
      default:
        return false;
    }
  }

  private handleError(error: HttpResponseBase, hash?: string): boolean {
    if (error && error.status) {
      switch (error.status) {
        case 404:
          if (error.statusText && error.statusText === 'OK') {
            return this.handleState(VERIFICATION_STATE.HASH_VERIFICATION_FAILED, hash);
          }
          break;
        case 503:
          return this.handleState(VERIFICATION_STATE.SERVICE_CURRENTLY_UNAVAILABLE);
      }
    }
    return this.handleState(VERIFICATION_STATE.HASH_VERIFICATION_ERROR, hash);
  }
}
