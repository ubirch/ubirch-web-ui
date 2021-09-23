import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {KeycloakAuthGuard, KeycloakService} from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthOnlyGuard extends KeycloakAuthGuard implements CanActivate {
  constructor(protected router: Router, protected keycloakAngular: KeycloakService) {
    super(router, keycloakAngular);
  }

  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (!this.authenticated) {
        this.keycloakAngular.login();
        return reject(false);
      }

      const requiredRoles = route.data.requiredRoles;
      if (requiredRoles?.length > 0) {
        return (this.roleMatched(requiredRoles, this.roles));
      }

      return resolve(true);
    });
  }

  private roleMatched(roles: string[], roles2find: string[]): boolean {
    let found = false;

    if (!roles || roles.length === 0 || !roles2find || roles2find.length === 0) return found;

    for (const requiredRole of roles2find) {
      if (roles.indexOf(requiredRole) > -1) {
        found = true;
        break;
      }
    }

    return found;
  }
}
