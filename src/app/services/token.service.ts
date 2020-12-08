import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ToastType } from '../enums/toast-type.enum';
import { CreateTokenFormData } from '../models/create-token-form-data';
import { IUbirchAccountingJWT } from '../models/iubirch-accounting-jwt';
import { IUbirchAccountingTokenList } from '../models/iubirch-accounting-token-list';
import { UbirchAccountingToken } from '../models/ubirch-accounting-token';
import { UbirchAccountingTokenCreationData } from '../models/ubirch-accounting-token-creation-data';
import { LoggingService } from './logging.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  private API_URL = environment.tokenServiceServerUrl + environment.tokenServiceApiPrefix;
  private jwtHelper: JwtHelperService;

  constructor(
    private http: HttpClient,
    private toast: ToastService,
    private logger: LoggingService,
  ) {
    this.jwtHelper = new JwtHelperService();
  }

  public getAllTokens(): Observable<UbirchAccountingToken[]> {
    return this.http.get<IUbirchAccountingTokenList>(this.API_URL).pipe(
      map((listofTokens: IUbirchAccountingTokenList) => {
        return listofTokens.data
          .map((jwt: IUbirchAccountingJWT) => this.extractUbirchAccountingTokenFromJWT(jwt))
          .filter((token: UbirchAccountingToken) => token !== undefined);
      }),
      catchError(err => {
        this.toast.openToast(ToastType.danger, 'toast.token.getlist.failed', 10000, err.message);
        return [];
      }),
    );
  }

  public createToken(data: CreateTokenFormData): Observable<UbirchAccountingToken> {

    const url = `${this.API_URL}//verification/create`;

    return this.http.post<UbirchAccountingToken>(url, this.prepareTokenDataForCreation(data)).pipe(
      map( (newToken: any) => newToken),
      catchError(err => {
        this.toast.openToast(ToastType.danger, ':toast.token.creation.failed', 10000, err.message);
        return undefined;
      })
    );
  }

  deleteToken(tokenId) {
    // TODO
  }

  private extractUbirchAccountingTokenFromJWT(rawTokenP: IUbirchAccountingJWT): UbirchAccountingToken {

    if (rawTokenP?.tokenValue) {

      const decodedToken: any = this.jwtHelper.decodeToken(rawTokenP.tokenValue);
      const expirationDate: Date = this.jwtHelper.getTokenExpirationDate(rawTokenP.tokenValue);
      const isExpired: boolean = this.jwtHelper.isTokenExpired(rawTokenP.tokenValue);

      return new UbirchAccountingToken(decodedToken, expirationDate, isExpired);
    } else {

      this.logger.warn('Got token without tokenValue! Will be removed from list...');
      return undefined;

    }
  }

  private prepareTokenDataForCreation(tokenDataP: CreateTokenFormData): UbirchAccountingTokenCreationData {

    const uatcd: UbirchAccountingTokenCreationData = new UbirchAccountingTokenCreationData(  {
      // TODO: get userid from userinfo and use as tenantId
      tenantId: 'd63ecc03-f5a7-4d43-91d0-a30d034d8da3',
      purpose: tokenDataP.purpose,
      targetIdentities: tokenDataP.validForAll ? '*' : tokenDataP.targetIdentities
    });

    if (tokenDataP.expiration) {
      uatcd.expiration = tokenDataP.expiration;
    }

    if (tokenDataP.notBefore) {
      uatcd.notBefore = tokenDataP.notBefore;
    }

    return uatcd;
  }
}
