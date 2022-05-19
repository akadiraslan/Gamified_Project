import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { NbThemeService } from '@nebular/theme';
import { BaseComponent } from 'app/@components/base/base.component';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../@core/store/reducers';
import * as authActions from '../../../@core/store/actions/auth.actions';
@Component({
    selector: 'ngx-otp',
    templateUrl: './otp.component.html',
})

export class NgxOtpComponent extends BaseComponent implements OnInit {

    errors: string[] = [];
    messages: string[] = [];
    user: any = {};
    submittedOtp: boolean = false;
    otpForm: FormGroup;
    formPost: boolean = true;

    get otp() {
        return this.otpForm.get('otp');
    }

    constructor(protected themeService: NbThemeService,
        private fb: FormBuilder,
        protected router: Router,
        private store: Store<fromRoot.State>) {
        super();
    }


    ngOnInit(): void {

        this.otpForm = this.fb.group({
            otp: this.fb.control('', [Validators.required]),
        });
    }


    onSubmit(): void {
        this.errors = [];
        this.messages = [];

        const data = {
            type: 'email',
            otp: this.otp.value
        };

        this.store.dispatch(new authActions.Otp(data));

    }
}
