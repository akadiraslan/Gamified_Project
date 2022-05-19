import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';
import { Route } from '../../data/route';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private apiService: ApiService) {
  }

  getThemes(page: any = null, organisationId: any): Observable<any> {
    if (page === null) {
      return this.apiService.get(`${Route.THEMES}`, organisationId).pipe(catchError(this.formatError));
    } else {
      return this.apiService.get(`${Route.THEMES}` + '?page=' + page).pipe(catchError(this.formatError));
    }
  }

  formatError(error: any) {
    return of(environment.apiUrl + error.error);
  }
}
