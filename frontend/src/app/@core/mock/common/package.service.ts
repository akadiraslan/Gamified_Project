import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';
import { Route } from '../../data/route';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PackageService {

    constructor(private apiService: ApiService) {
    }

    getPackages(page: any = null): Observable<any> {
        if (page === null) {
            return this.apiService.get(`${Route.PACKAGES}`).pipe(catchError(this.formatError));
        } else {
            return this.apiService.get(`${Route.PACKAGES}` + '?page=' + page).pipe(catchError(this.formatError));
        }
    }

    getBoughtPackages(page: any = null): Observable<any> {
        if (page === null) {
            return this.apiService.get(`${Route.PACKAGES_BOUGHT}`).pipe(catchError(this.formatError));
        } else {
            return this.apiService.get(`${Route.PACKAGES_BOUGHT}` + '?page=' + page)
                .pipe(catchError(this.formatError));
        }
    }

    buyPackage(data: any): Observable<any> {
        return this.apiService.post(`${Route.PACKAGES}`, data).pipe(catchError(this.formatError));
    }

    savePackage(data: any): Observable<any> {
        return this.apiService.post(`${Route.PACKAGES}`, data).pipe(catchError(this.formatError));
    }

    formatError(error: any) {
        return of(environment.apiUrl + error.error);
    }
}
