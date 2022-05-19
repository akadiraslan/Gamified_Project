import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Route } from '../@core/data/route';
import { ADMIN } from '../@core/data/data';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    path: string;

    constructor(private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request.headers.has('Content-Type')) {
            if (request.url === environment.apiUrl + this.path + Route.UPLOAD) {
                this.upload(request);
            } else {
                request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
            }
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request).pipe(tap(() => {
        },
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status !== 401) {
                        return;
                    }
                    this.router.navigate(['auth/login']);
                }
            }));
    }

    private upload(request: HttpRequest<any>): HttpRequest<any> {
        request = request.clone({ headers: request.headers.set('reportProgress', 'true') });
        request = request.clone({ headers: request.headers.set('observe', 'event') });
        return request;
    }
}
