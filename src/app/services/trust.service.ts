import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams, HttpResponseBase} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Upp} from '../models/upp';
import {BlockChainNode} from '../models/block-chain-node';
import {VERIFY_RESULT_2BCS} from '../../../testdata/verify-result-2bc-nodes';
import * as BlockchainSettings from '../../assets/constants/blockchain-settings.json';
import {IUbirchBlockhainSettings} from '../models/iubirch-blockhain-settings';

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
   * Observable of current verified hash
   */
  private currVerifiedHash: string;
  private bsvHash = new BehaviorSubject<string>(this.currVerifiedHash);
  public observableVerifiedHash: Observable<string> = this.bsvHash.asObservable();

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
  ) {}

  public static get BlockchainSettings(): IUbirchBlockhainSettings {
    return BlockchainSettings && BlockchainSettings['default'] ?
      BlockchainSettings['default']['blockchain-settings'] : BlockchainSettings['blockchain-settings'];
  }

  public saveHash(vHash: string) {
    if (vHash) {
      this.bsHash.next(vHash);
    } else {
      this.bsHash.next(null);
    }
  }

  public verifyByHash(vHash: string, update = true): Observable<boolean> {
    // for debug purpose manually add following line in the environment settings:
    //   debug: true,
    if (environment.debug) {
      return of(this.handleUppCreation(VERIFY_RESULT_2BCS, vHash, update));
    }

    if (vHash && vHash.length > 0) {
      const url = this.API_URL + this.getRecord;
      this.handleState(VERIFICATION_STATE.PENDING, update ? vHash : undefined);
      return this.http.post<any>(url, vHash, {params: this.withPathSuffix}).pipe(
        map(jsonHashVerification =>
          this.handleUppCreation(jsonHashVerification, vHash, update)
        ),
        catchError(error => {
          return of(this.handleError(error, update ? vHash : undefined));
        })
      );
    } else {
      return of(this.handleState(VERIFICATION_STATE.NO_HASH));
    }
  }

  public getBlockchainExplorerUrl(bcNode: BlockChainNode): string {
    let bcExplorerURLWithTxid: string;
    if (bcNode) {
      if (bcNode instanceof BlockChainNode) {
        try {
          const bcSettings = TrustService.BlockchainSettings[bcNode.blockchain];
          const bcSettingOfNetworkType = bcSettings.explorerUrl[bcNode.networkType];
          const bcExplUrl = bcSettingOfNetworkType.url;
          bcExplorerURLWithTxid = bcExplUrl + bcNode.txid;
          console.log('bcExplorerURL:' + bcExplorerURLWithTxid);
        } catch (e) {
          console.warn('BlockchainExplorer url not configured for given settings:');
          console.warn('bcNode.blockchain: ' + bcNode.blockchain);
          console.warn('bcNode.networkType: ' + bcNode.networkType);
          console.warn('BlockchainSettings: ' + JSON.stringify(TrustService.BlockchainSettings));
          console.warn(e.message);
        }
      } else {
        console.warn('cannot open BlockchainExplorer: node for id is not instance of type BlockChainNode (no txid)');
      }
    } else {
      console.warn('cannot open BlockchainExplorer: node for id missing');
    }
    return bcExplorerURLWithTxid;
  }

  private handleUppCreation(jsonHashVerification: any, vHash: string, update: boolean): boolean {
    const upp = new Upp(jsonHashVerification);
    upp.pureJSON = jsonHashVerification;
    if (upp) {
      return this.handleState(VERIFICATION_STATE.HASH_VERIFIED, update ? vHash : undefined, upp);
    } else {
      return this.handleState(VERIFICATION_STATE.HASH_VERIFICATION_FAILED, update ? vHash : undefined);
    }
  }

  private handleState(state: string, hash?: string, upp?: Upp): boolean {
    this.bsHashVerifyState.next(state);
    if (hash) {
      this.bsvHash.next(hash);
    } else {
      if (this.bsvHash.getValue() != null) {
        this.bsvHash.next(null);
      }
    }
    if (upp) {
      this.bsUPP.next(upp);
    } else {
      if (this.bsUPP.getValue() != null) {
        this.bsUPP.next(null);
      }
    }
    switch (state) {
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
