import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {ToastType} from '../enums/toast-type.enum';
import {CreateTokenFormData} from '../models/create-token-form-data';
import {IUbirchAccountingJWT} from '../models/iubirch-accounting-jwt';
import {IUbirchAccountingTokenCreationResponse} from '../models/iubirch-accounting-token-creation-response';
import {IUbirchAccountingTokenList} from '../models/iubirch-accounting-token-list';
import {UbirchAccountingToken} from '../models/ubirch-accounting-token';
import {UbirchAccountingTokenCreationData} from '../models/ubirch-accounting-token-creation-data';
import {User} from '../models/user';
import {LoggingService} from './logging.service';
import {ToastService} from './toast.service';
import {UserService} from './user.service';

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
    private userService: UserService,
  ) {
    this.jwtHelper = new JwtHelperService();
  }

  public getAllTokens(): Observable<UbirchAccountingToken[]> {
    return this.http.get<IUbirchAccountingTokenList>(this.API_URL).pipe(
      map((listofTokens: IUbirchAccountingTokenList) => {
        return listofTokens.data
          .map((jwt: IUbirchAccountingJWT) => this.extractUbirchAccountingTokenFromJWT(jwt?.tokenValue))
          .filter((token: UbirchAccountingToken) => token !== undefined);
      }),
      catchError(err => {
        this.toast.openToast(ToastType.danger, 'toast.token.getlist.failed', 10000, err.message);
        return [];
      }),
    );
  }
  
  public getAvailableScopes(): Observable<any>{
      return this.http.get<any>(this.API_URL + '/scopes').pipe(
          map((listOfScopes) => {
              return listOfScopes.data;
          }),
          catchError( err => {
              this.toast.openToast(ToastType.danger, 'toast.token.getlist.failed', 10000, err.message);
              return [];
          })
      );
  }

  public async createToken(data: CreateTokenFormData): Promise<UbirchAccountingToken> {

    const url = `${this.API_URL}/create`;
    const creationData: UbirchAccountingTokenCreationData = await this.prepareTokenDataForCreation(data);
    console.log('creationData', creationData);

    const resp: IUbirchAccountingTokenCreationResponse =
      await this.http.post<IUbirchAccountingTokenCreationResponse>(url, creationData).toPromise()
        .catch((err: Error) => {
          this.toast.openToast(ToastType.danger, 'toast.token.creation.failed', 10000, err.message);
          throw err;
        });

    return this.extractUbirchAccountingTokenFromJWT(resp?.data?.token);
  }

  async deleteToken(tokenP) {
      // TODO
      const url = `${this.API_URL}/`;
      await this.http.delete(url + tokenP).toPromise()
          .catch((err: Error) => {
              console.log('token deletion failed');
              this.toast.openToast(ToastType.danger, 'toast.token.deletion.failed', 10000);
          });
  }

  private extractUbirchAccountingTokenFromJWT(tokenValue: string): UbirchAccountingToken {

    if (tokenValue) {

      const decodedToken: any = this.jwtHelper.decodeToken(tokenValue);
      const expirationDate: Date = this.jwtHelper.getTokenExpirationDate(tokenValue);
      const isExpired: boolean = this.jwtHelper.isTokenExpired(tokenValue);

      return new UbirchAccountingToken(tokenValue, decodedToken, expirationDate, isExpired);
    } else {

      this.logger.warn('Got token without tokenValue! Will be removed from list...');
      return undefined;

    }
  }

  private async prepareTokenDataForCreation(tokenDataP: CreateTokenFormData): Promise<UbirchAccountingTokenCreationData> {

    return this.userService.getUser().toPromise().then(
      (user: User) => {
        const uatcd: UbirchAccountingTokenCreationData = new UbirchAccountingTokenCreationData({
          // TODO: check for user account type:
          //  * if user has free account use userid as tenantId
          //  * if user has pro account use tenant id (check if tenant profile is filled out sufficiently)
          tenantId: user.id, // use userid as tenantId
          purpose: tokenDataP.purpose,
          targetIdentities: tokenDataP.targetIdentities,
            scopes: [tokenDataP.scopes],
            originDomains: tokenDataP.originDomains
        });

        if (tokenDataP.expiration) {
          uatcd.expiration = tokenDataP.expiration;
        }

        if (tokenDataP.notBefore) {
          uatcd.notBefore = tokenDataP.notBefore;
        }

        if (tokenDataP.targetGroups) {
            uatcd.targetGroups = tokenDataP.targetGroups;
        }

        console.log(uatcd);
        return uatcd;
      },
    );
  }
}
