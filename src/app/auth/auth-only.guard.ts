import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})

export class AuthOnlyGuard extends KeycloakAuthGuard implements CanActivate {

  private notAllowedRedirectUrls: string[] = ['/logout'];

  constructor(
    protected readonly router: Router,
    protected readonly keycloak: KeycloakService,
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      const notAllowedRedirectUrl =
        this.notAllowedRedirectUrls.filter((notAllowedUrl: string) => state.url.includes(notAllowedUrl)).length > 0;

      await this.keycloak.login({
        redirectUri: window.location.origin + (notAllowedRedirectUrl ? '' : state.url),
      });
    }

    // Get the roles required from the route.
    const rolesRequired = route.data.roles_required;

    const rolesRequiredDefined = (rolesRequired instanceof Array) && rolesRequired.length > 0;

    const accessAllowedByRole: boolean = rolesRequiredDefined ?
      rolesRequired.some((role: string) => this.roles.includes(role)) : true;

    // go back to start and try again
    if (!accessAllowedByRole) {
      this.router.navigate(['/home']);
    }

    return accessAllowedByRole;
  }
}

// export class AuthOnlyGuard extends KeycloakAuthGuard implements CanActivate {
//   constructor(protected router: Router, protected keycloakAngular: KeycloakService) {
//     super(router, keycloakAngular);
//   }
//
//   isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
//     return new Promise(async (resolve, reject) => {
//       if (!this.authenticated) {
//         this.keycloakAngular.login();
//         return reject(false);
//       }
//
//       const requiredRoles = route.data.requiredRoles;
//       if (requiredRoles?.length > 0) {
//         return (this.roleMatched(requiredRoles, this.roles));
//       }
//
//       return resolve(true);
//     });
//   }
//
//   private roleMatched(roles: string[], roles2find: string[]): boolean {
//     let found = false;
//
//     if (!roles || roles.length === 0 || !roles2find || roles2find.length === 0) return found;
//
//     for (const requiredRole of roles2find) {
//       if (roles.indexOf(requiredRole) > -1) {
//         found = true;
//         break;
//       }
//     }
//
//     return found;
//   }
// }
