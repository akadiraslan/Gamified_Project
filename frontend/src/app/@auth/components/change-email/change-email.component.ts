import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EMAIL_PATTERN} from '../constants';
import {AuthService} from '../../../services/auth.service';
import {ERROR, SUCCESS} from '../../../@core/data/data';
import {Route} from '../../../@core/data/route';
import {BaseComponent} from 'app/@components/base/base.component';
import {authOptions} from '../../auth.settings';

@Component({
    selector: 'ngx-change-email-page',
    styleUrls: ['./change-email.component.scss'],
    templateUrl: './change-email.component.html',
})
export class NgxChangeEmailComponent extends BaseComponent implements OnInit {

    isEmailRequired: boolean = authOptions.forms.validation.email.required;

    submitted = false;
    errors: string[] = [];
    messages: string[] = [];
    user: any = {};
    changeMailForm: FormGroup;

    constructor(
        protected fb: FormBuilder,
        private authService: AuthService,
        private route: ActivatedRoute,
        protected router: Router) {
        super();
    }

    get email() {
        return this.changeMailForm.get('email');
    }

    ngOnInit(): void {

        this.changeMailForm = this.fb.group({
            email: this.fb.control('', [Validators.required]),
            email_old: this.fb.control('', [Validators.required]),
            confirm_token: this.fb.control('', [Validators.required])
        });
        this.hasConfirmRoute();
    }

    hasConfirmRoute() {
        this.changeMailForm.get('email_old').setValue(this.route.snapshot.paramMap.get('email'));
        this.changeMailForm.get('confirm_token').setValue(this.route.snapshot.paramMap.get('confirm_token'));
    }

    onSubmit(): void {
        this.errors = this.messages = [];
        this.submitted = true;
        this.spinnerShow();
        this.authService.changeEmail(this.changeMailForm.value).subscribe(
            (data: any) => {
                this.spinnerHide();
                if (data.success) {
                    this.showMessage(
                        this.translate('title.ChangeEmail'),
                        this.translate(data.message),
                        SUCCESS,
                        Route.PUBLIC.LOGIN
                    );
                } else {
                    this.showMessage(
                        this.translate('title.ChangeEmail'),
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
