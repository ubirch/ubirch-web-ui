import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../services/user.service';
import {map, skipWhile, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountProfileValidGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.getAccountInfo().pipe(
      skipWhile(a => !a),
      map(account => !account.profileSettingsRequired ?
                              true : account.profileSettingsSufficient),
      tap(userDoNotNeedToSetProfileFirst => {
        if (!userDoNotNeedToSetProfileFirst) {
          this.router.navigate(['/account-profile']);
        }
      }),
    );
  }
}
