import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ToastType } from '../enums/toast-type.enum';
import { IUbirchAccountingJWT } from '../models/iubirch-accounting-jwt';
import { IUbirchAccountingTokenList } from '../models/iubirch-accounting-token-list';
import { UbirchAccountingToken } from '../models/ubirch-accounting-token';
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

  postToken() {
    // TODO
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
}
