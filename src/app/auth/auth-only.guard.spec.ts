import { TestBed, async, inject, getTestBed } from '@angular/core/testing';

import { AuthOnlyGuard } from './auth-only.guard';
import { RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

describe('AuthOnlyGuard', () => {
  let injector: TestBed;
  let keycloakAngular: KeycloakService;
  let guard: AuthOnlyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      providers: [
        AuthOnlyGuard,
        {
          provide: KeycloakService,
          useValue: {
            isLoggedIn() {
              return new Promise(resolve => resolve(true));
            },
            getUserRoles() {
              return [];
            },
            login() {
              return new Promise(resolve => resolve());
            }
          },
        }
      ],
    });

    injector = getTestBed();
    guard = injector.get(AuthOnlyGuard);
    keycloakAngular = injector.get(KeycloakService);
  });

  it('should ...', () => {
    expect(guard).toBeTruthy();
  });

  it('should return rejected promise and call KeycloakService.login if user is not authorised', async () => {
    const loginSpy = spyOn(keycloakAngular, 'login').and.callThrough();

    const result = await guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(result).toBe(true);
    expect(loginSpy).toHaveBeenCalledTimes(0);
  });

  it('should return resolved promise and do not call KeycloakService.login if user is authorised', async () => {
    const loginSpy = spyOn(keycloakAngular, 'login').and.callThrough();
    spyOn(keycloakAngular, 'isLoggedIn').and.returnValue(new Promise(resolve => resolve(false)));

    let result: boolean;

    try {
      result = await guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot) as boolean;
    } catch {
      result = false;
    }

    expect(result).toBe(false);
    expect(loginSpy).toHaveBeenCalledTimes(1);
  });
});
