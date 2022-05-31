import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { NbThemeService } from '@nebular/theme';
import { EMAIL_PATTERN } from '../constants';
import { AuthService } from '../../../services/auth.service';
import { BaseComponent } from 'app/@components/base/base.component';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../@core/store/reducers';
import * as authActions from '../../../@core/store/actions/auth.actions';
import { Observable } from 'rxjs';
import { authOptions } from '../../auth.settings';
import { ERROR } from '../../../@core/data/data';
import { environment } from '../../../../environments/environment';
import { GameService } from '../../../@core/mock/common/game.service';
import { MessageService } from 'app/@core/mock/common/message.service';
import { StorageService } from 'app/services/storage.service';
import { id } from '@swimlane/ngx-charts';

@Component({
    selector: 'ngx-login',
    templateUrl: './login.component.html',
    providers: [AuthService]
})

export class NgxLoginComponent extends BaseComponent implements OnInit {


    minLength: number = authOptions.forms.validation.password.minLength;
    maxLength: number = authOptions.forms.validation.password.maxLength;
    redirectDelay: number = authOptions.forms.login.redirectDelay;
    isEmailRequired: boolean = authOptions.forms.validation.email.required;
    isPasswordRequired: boolean = authOptions.forms.validation.password.required;
    rememberMe: boolean = authOptions.forms.validation.rememberMe.required;

    errors: string[] = [];
    messages: string[] = [];
    user: any = {};
    submitted: boolean = false;
    loginForm: FormGroup;
    formPost: boolean = true;
    getState: Observable<any>;

    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }


    constructor(protected themeService: NbThemeService,
        private fb: FormBuilder,
        protected router: Router,
        private authService: AuthService,
        private store: Store<fromRoot.State>, private gameService: GameService,
        private messageService: MessageService, private storageService: StorageService
    ) {
        super();
        this.getState = this.store.select(fromRoot.selectAuthListState$);
    }


    ngOnInit(): void {

        this.store.dispatch(new authActions.Logout(''));
        this.checkDomain();
        const emailValidators = [
            Validators.pattern(EMAIL_PATTERN)
        ];
        this.isEmailRequired && emailValidators.push(Validators.required);

        const passwordValidators = [
            Validators.minLength(this.minLength),
            Validators.maxLength(this.maxLength)
        ];
        this.isPasswordRequired && passwordValidators.push(Validators.required);

        this.loginForm = this.fb.group({
            email: this.fb.control('', [...emailValidators]),
            password: this.fb.control('', [...passwordValidators]),
            rememberMe: this.fb.control(false),
            type: this.fb.control('email')
        });
    }

    checkDomain() {
        if (environment.production) {
        }
    }


    login() {
        this.spinnerShow();
        this.gameService.loginService(this.loginForm.value).subscribe((data: any) => {
            console.log(this.loginForm.value);
            if (data) {
                this.messageService.loginData = data;
                this.storageService.clearStorage();
                this.storageService.setUserId(data.id);

                this.router.navigateByUrl('/dashboard');

            }
            this.spinnerHide();
        });

    }

}
