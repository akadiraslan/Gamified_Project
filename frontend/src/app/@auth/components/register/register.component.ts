import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMAIL_PATTERN } from '../constants';
import { BaseComponent } from 'app/@components/base/base.component';
import { AuthService } from '../../../services/auth.service';
import { ERROR, NAME, SUCCESS } from '../../../@core/data/data';
import { Route } from '../../../@core/data/route';
import { authOptions } from '../../auth.settings';

@Component({
    selector: 'ngx-register',
    styleUrls: ['./register.component.scss'],
    templateUrl: './register.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxRegisterComponent extends BaseComponent implements OnInit {
    minNameLength: number = authOptions.forms.validation.name.minLength;
    minDomainNameLength: number = authOptions.forms.validation.domain.minLength;
    minPhoneLength: number = authOptions.forms.validation.phone.minLength;
    maxNameLength: number = authOptions.forms.validation.name.maxLength;
    maxDomainNameLength: number = authOptions.forms.validation.domain.maxLength;
    maxPhoneLength: number = authOptions.forms.validation.phone.maxLength;
    minLength: number = authOptions.forms.validation.password.minLength;
    maxLength: number = authOptions.forms.validation.password.maxLength;
    isNameRequired: boolean = authOptions.forms.validation.name.required;
    isDomainNameRequired: boolean = authOptions.forms.validation.domain.required;
    isSurNameRequired: boolean = authOptions.forms.validation.name.required;
    isPhone: boolean = authOptions.forms.validation.phone.required;
    isEmailRequired: boolean = authOptions.forms.validation.email.required;
    isPasswordRequired: boolean = authOptions.forms.validation.password.required;
    redirectDelay: number = authOptions.forms.register.redirectDelay;
    term: boolean = authOptions.forms.register.terms;

    submitted = false;
    errors: string[] = [];
    messages: string[] = [];
    user: any = {};
    isDomain: any = true;

    registerForm: FormGroup;

    constructor(private fb: FormBuilder,
        private authService: AuthService,
        protected router: Router) {
        super();
    }

    get name() {
        return this.registerForm.get(NAME);
    }

    get surname() {
        return this.registerForm.get('surname');
    }

    get organisationName() {
        return this.registerForm.get('organisationName');
    }

    get domainName() {
        return this.registerForm.get('domainName');
    }

    setDomainName() {
        this.registerForm.get('domainName').setValue('');
    }

    get phone() {
        return this.registerForm.get('phone');
    }

    get email() {
        return this.registerForm.get('email');
    }

    get password() {
        return this.registerForm.get('password');
    }

    get confirmPassword() {
        return this.registerForm.get('confirmPassword');
    }

    get terms() {
        return this.registerForm.get('terms');
    }

    ngOnInit(): void {
        const loginValidators = [
            Validators.minLength(this.minNameLength),
            Validators.maxLength(this.maxNameLength),
        ];
        const phoneValidators = [
            Validators.minLength(this.minPhoneLength),
            Validators.maxLength(this.maxPhoneLength),
        ];
        this.isNameRequired && loginValidators.push(Validators.required);
        this.isDomainNameRequired && loginValidators.push(Validators.required);
        this.isSurNameRequired && loginValidators.push(Validators.required);
        this.isPhone && phoneValidators.push(Validators.required);

        const emailValidators = [
            Validators.pattern(EMAIL_PATTERN),
        ];
        this.isEmailRequired && emailValidators.push(Validators.required);

        const passwordValidators = [
            Validators.minLength(this.minLength),
            Validators.maxLength(this.maxLength),
        ];
        this.isPasswordRequired && passwordValidators.push(Validators.required);

        this.registerForm = this.fb.group({
            name: this.fb.control('', [...loginValidators]),
            email: this.fb.control('', [...emailValidators]),
            password: this.fb.control('', [...passwordValidators]),
            confirmPassword: this.fb.control('', [...passwordValidators]),
            terms: this.fb.control(''),
        });
        this.checkSubDomain();

    }

    checkSubDomain() {
    }

    register(): void {

        this.errors = this.messages = [];
        this.submitted = true;
        this.spinnerShow();
        console.log(this.registerForm);

        // this.authService.signUp(this.registerForm.value).subscribe(
        //     (data: any) => {
        //         this.submitted = false;
        //         this.spinnerHide();
        //         if (data.success) {
        //             this.showMessage(
        //                 this.translate('title.Registration'),
        //                 this.translate(data.message),
        //                 SUCCESS,
        //                 Route.PUBLIC.LOGIN
        //             );
        //         } else {
        //             this.showMessage(
        //                 this.translate('title.Registration'),
        //                 this.translate(data.message),
        //                 ERROR
        //             );
        //         }

        //     },
        //     error => {
        //         this.spinnerHide();
        //         this.submitted = false;
        //         this.showMessage(
        //             this.translate('title.Registration'),
        //             this.translate(error.error.message),
        //             ERROR
        //         );
        //     }
        // );


    }


    numberOnly(event: any) {
        const charCode = (event.which) ? event.which : event.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
            return false;
        }
    }
}
