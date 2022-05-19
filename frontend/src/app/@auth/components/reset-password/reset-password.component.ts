
import { Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseComponent} from 'app/@components/base/base.component';
import {AuthService} from '../../../services/auth.service';
import {ERROR, SUCCESS} from '../../../@core/data/data';
import {Route} from '../../../@core/data/route';
import {EMAIL_PATTERN} from '../constants';
import {authOptions} from '../../auth.settings';

@Component({
    selector: 'ngx-reset-password-page',
    styleUrls: ['./reset-password.component.scss'],
    templateUrl: './reset-password.component.html',
})
export class NgxResetPasswordComponent extends BaseComponent implements OnInit {
    minLength: number = authOptions.forms.validation.password.minLength;
    maxLength: number = authOptions.forms.validation.password.maxLength;
    redirectDelay: number = authOptions.forms.resetPassword.redirectDelay;
    isEmailRequired: boolean = authOptions.forms.validation.email.required;
    isPasswordRequired: boolean = authOptions.forms.validation.password.required;

    submitted = false;
    errors: string[] = [];
    messages: string[] = [];
    resetPasswordForm: FormGroup;
    user = {
        email: null,
        password: null,
        password_confirmation: null,
        resetToken: null
    };

    constructor(protected fb: FormBuilder,
                private route: ActivatedRoute,
                private authService: AuthService,
                protected router: Router) {
        super();
    }

    ngOnInit(): void {
        this.user.resetToken = this.route.snapshot.paramMap.get('token');

        const passwordValidators = [
            Validators.minLength(this.minLength),
            Validators.maxLength(this.maxLength),
        ];
        const emailValidators = [
            Validators.pattern(EMAIL_PATTERN),
        ];
        this.isEmailRequired && emailValidators.push(Validators.required);

        this.isPasswordRequired && passwordValidators.push(Validators.required);

        this.resetPasswordForm = this.fb.group({
            email: this.fb.control('', [...emailValidators]),
            password: this.fb.control('', [...passwordValidators]),
            confirmPassword: this.fb.control('', [...passwordValidators]),
        });
    }

    get password() {
        return this.resetPasswordForm.get('password');
    }

    get email() {
        return this.resetPasswordForm.get('email');
    }

    get confirmPassword() {
        return this.resetPasswordForm.get('confirmPassword');
    }

    resetPass(): void {
        this.errors = this.messages = [];
        this.submitted = true;
        this.user.password = this.password.value;
        this.user.password_confirmation = this.confirmPassword.value;
        this.user.email = this.email.value;
        this.spinnerShow();
        this.authService.changePassword(this.user).subscribe(
            (data: any) => {
                this.submitted = false;
                this.spinnerHide();
                if (data.success) {
                    this.showMessage(
                        this.translate('title.Change_Password'),
                        this.translate(data.message),
                        SUCCESS,
                        Route.PUBLIC.LOGIN
                    );
                } else {
                    this.showMessage(
                        this.translate('title.Change_Password'),
                        this.translate(data.message),
                        ERROR,
                    );
                }
            }, error => {
                this.submitted = false;
                this.spinnerHide();
                this.showMessage(
                    this.translate('title.Change_Password'),
                    this.translate(error.error.message),
                    ERROR,
                );
            }
        );


    }
}
