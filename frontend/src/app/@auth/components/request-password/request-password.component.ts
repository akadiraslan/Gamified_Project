import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {getDeepFromObject} from '../../helpers';
import {EMAIL_PATTERN} from '../constants';
import {AuthService} from '../../../services/auth.service';
import {ERROR, SUCCESS} from '../../../@core/data/data';
import {Route} from '../../../@core/data/route';
import {BaseComponent} from 'app/@components/base/base.component';
import {authOptions} from '../../auth.settings';

@Component({
    selector: 'ngx-request-password-page',
    styleUrls: ['./request-password.component.scss'],
    templateUrl: './request-password.component.html',
})
export class NgxRequestPasswordComponent extends BaseComponent implements OnInit {
    redirectDelay: number = authOptions.forms.requestPassword.redirectDelay;
    isEmailRequired: boolean = authOptions.forms.validation.email.required;

    submitted = false;
    errors: string[] = [];
    messages: string[] = [];
    user: any = {};
    requestPasswordForm: FormGroup;

    constructor(
        protected fb: FormBuilder,
        private authService: AuthService,
        protected router: Router) {
        super();
    }

    get email() {
        return this.requestPasswordForm.get('email');
    }

    ngOnInit(): void {
        const passwordValidators = [
            Validators.pattern(EMAIL_PATTERN),
        ];
        this.isEmailRequired && passwordValidators.push(Validators.required);

        this.requestPasswordForm = this.fb.group({
            email: this.fb.control('', [...passwordValidators]),
        });
    }

    requestPass(): void {
        this.user = this.requestPasswordForm.value;
        this.errors = this.messages = [];
        this.submitted = true;
        this.spinnerShow();
        this.authService.sendPasswordResetLink(this.user).subscribe(
            (data: any) => {
                this.spinnerHide();
                if (data.success) {
                    this.showMessage(
                        this.translate('title.Forgot_Password'),
                        this.translate(data.message),
                        SUCCESS,
                        Route.PUBLIC.LOGIN
                    );
                } else {
                    this.showMessage(
                        this.translate('title.Forgot_Password'),
                        this.translate(data.message),
                        ERROR,
                    );

                }
            }, error => {
                this.submitted = false;
                this.spinnerHide();
                this.showMessage(
                    this.translate('title.Forgot_Password'),
                    this.translate(error.error.message),
                    ERROR,
                );
            }
        );

    }
}
