import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient,
              private store: Store<any>) {
  }

  signUp(data) {
    return this.http.post(`${environment.apiUrl}/auth/sign-up`, data);
  }

  login(data) {
    return this.http.post(`${environment.apiUrl}/auth/login`, data);
  }

  otp(data) {
    return this.http.post(`${environment.apiUrl}/auth/otp`, data);
  }

  sendPasswordResetLink(data) {
    return this.http.post(`${environment.apiUrl}/auth/sendPasswordResetLink`, data);
  }

  changeEmail(data) {
    return this.http.post(`${environment.apiUrl}/auth/change-email`, data);
  }

  changePassword(data) {
    return this.http.post(`${environment.apiUrl}/auth/resetPassword`, data);
  }

  checkDomain(data) {
    return this.http.post(`${environment.apiUrl}/auth/check-domain`, data);
  }

  getAllStates() {
    return this.store.select(state => state.appReducer);
  }

  registerConfirmation(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/checkConfirmToken`, data)
      .pipe(catchError(this.formatError));
  }

  formatError(error: any) {
    return of(error.error);
  }


}
