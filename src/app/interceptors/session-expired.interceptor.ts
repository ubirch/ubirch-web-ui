import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { NEVER, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
    providedIn: 'root'
})
export class SessionExpiredInterceptor implements HttpInterceptor {

    constructor(
        private keycloakService: KeycloakService,

    ) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ) {
        return next.handle(req).pipe(
            catchError((err: any) => {
                if (req.url.includes(environment.serverUrl) && err instanceof HttpErrorResponse && err.status === 401) {
                    this.keycloakService.logout()
                    return NEVER;
                }
                else { return throwError(err); }
            })
        );
    }
}

export const sessionExpiredInterceptorProvider = { provide: HTTP_INTERCEPTORS, useClass: SessionExpiredInterceptor, multi: true };
