import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {UserService} from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class EnterOnDashboardGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    console.log('AuthGuard#canActivate called');
    return this.checkIfUserHasEntered();
  }

  checkIfUserHasEntered(): boolean {
    if (this.userService.hasUserEntered()) { return true; }

    // Navigate to the dashboard initially
    this.router.navigate(['/']);
    return false;
  }
}
