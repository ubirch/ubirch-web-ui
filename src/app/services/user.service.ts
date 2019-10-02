import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {User} from '../models/user';
import {AccountInfo} from '../models/account-info';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.serverUrl + environment.apiPrefix;
  accountUrl = this.url + 'users/accountInfo';

  private currentAccount: AccountInfo;
  private behaviorSubItem = new BehaviorSubject<AccountInfo>(this.currentAccount);
  public observableAccountInfo: Observable<AccountInfo> = this.behaviorSubItem.asObservable();

  constructor(
      private http: HttpClient
  ) {}

  public getUser(): Observable<User> {
    if (this.currentAccount) {
      return of(this.currentAccount.user);
    } else {
      return this.http.get<any>(this.accountUrl).pipe(
          tap(jsonAccount =>
              this.currentAccount = jsonAccount.user ?
                  {user: new User(jsonAccount.user), numberOfDevices: jsonAccount.numberOfDevices } : undefined ),
          map(_ => this.currentAccount ? this.currentAccount.user : undefined));
    }
  }

  public getAccountInfo(): Observable<AccountInfo> {
    if (this.currentAccount) {
      return of(this.currentAccount);
    } else {
      return this.http.get<any>(this.accountUrl).pipe(
          tap(jsonAccount => {
            this.currentAccount = jsonAccount.user ?
                new AccountInfo({
                  user: new User(jsonAccount.user),
                  numberOfDevices: jsonAccount.numberOfDevices
                }) : undefined;
            this.behaviorSubItem.next(this.currentAccount);
          }),
          map(_ => this.currentAccount));
    }
  }

  public setNumberOfDevices(num: number) {
    if (this.currentAccount) {
      this.currentAccount.numberOfDevices = num;
      this.behaviorSubItem.next(this.currentAccount);
    } else {
      this.getAccountInfo();
    }
  }
}
