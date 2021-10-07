import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class DefaultRouteGuard implements CanLoad {

  constructor(
    private router: Router,
    private keycloakService: KeycloakService,
  ) { }

  async canLoad(
    route: Route,
    segments: UrlSegment[]): Promise<boolean> {
    const loggedIn = await this.keycloakService.isLoggedIn();
    if (!loggedIn) {
      return false;
    }
    return true;
  }
}
