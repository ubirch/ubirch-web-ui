import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, skipWhile, tap } from 'rxjs/operators';

import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminOnlyGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.getAccountInfo().pipe(
      skipWhile(a => !a),
      map(account => account.isAdmin),
      tap(isAdmin => {
        if (!isAdmin) {
          this.router.navigate(['/home']);
        }
      }),
    );
  }
  
}
