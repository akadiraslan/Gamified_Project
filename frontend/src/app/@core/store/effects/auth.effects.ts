import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { HttpClient } from '@angular/common/http';

import { Observable, of, Subscriber } from 'rxjs';
import { Action } from '@ngrx/store';

import * as authActions from '../actions/auth.actions';

import { mergeMap, switchMap, map, catchError, tap, take } from 'rxjs/operators';
import { AuthActionTypes, AuthActions } from '../actions/auth.actions';
import { Router } from '@angular/router';
import { Route } from '../../data/route';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../model/user';
import { ERROR } from '../../data/data';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService,
        private translateService: TranslateService,
        private spinner: NgxSpinnerService) {
    }


    @Effect()
    login$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.LOGIN),
        switchMap((action: AuthActions) => {
            this.spinner.show();
            return this.authService.login(action.payload).pipe(
                map((data: any) => {
                    this.spinner.hide();
                    this.saveOtpToken(data);
                    return new authActions.LoginSuccess(data);
                }),
                catchError((error) => {
                    this.spinner.hide();
                    this.showMessage(
                        this.translateService.instant('title.Login'),
                        this.translateService.instant(error.error.message),
                        ERROR
                    );
                    return of(new authActions.LoginFailure({ payload: error }));
                })
            );
        })
    );

    @Effect()
    otp$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.OTP),
        switchMap((action: AuthActions) => {
            this.spinner.show();
            return this.authService.otp(action.payload).pipe(
                map((data: any) => {
                    this.spinner.hide();
                    this.saveUserToken(data);
                    return new authActions.OtpSuccess(data);
                }),
                catchError((error) => {
                    this.spinner.hide();
                    this.showMessage(
                        this.translateService.instant('title.Otp'),
                        this.translateService.instant(error.error.message),
                        ERROR
                    );
                    return of(new authActions.OtpFailure({ payload: error }));
                })
            );
        })
    );

    @Effect({ dispatch: false })
    logout$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.LOGOUT),
        tap((user) => {

            this.router.navigateByUrl(Route.PUBLIC.LOGIN);
        })
    );

    saveUserToken(user: User) {
    }

    saveOtpToken(tokenData: any) {
    }

    showMessage(title: string, message: string, status: any, redirectUrl: any = false) {
        Swal.fire(title, message, status).then((result) => {
            if (result.value) {
                if (redirectUrl !== false) {
                    this.router.navigateByUrl(redirectUrl);
                }
            }
        });
    }

}
