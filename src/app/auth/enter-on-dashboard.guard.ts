import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {UserService} from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
/**
 * AuthGuard for logout page: if user logs in after logout keycloak remembers last url => user would enter console on logout page!
 * With this guard the logout page can be entered after userInfo has been accessed successfully.
 * Attention: userInfo is fetched in userService.getAccountInfo, which is called by header component.
 */
export class EnterOnDashboardGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.checkIfUserHasEntered();
  }

  checkIfUserHasEntered(): boolean {
    if (this.userService.hasUserEntered()) { return true; }

    // Navigate to the dashboard initially
    this.router.navigate(['/home']);
    return false;
  }
}
