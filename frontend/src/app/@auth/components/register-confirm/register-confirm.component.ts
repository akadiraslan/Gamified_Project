import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {BaseComponent} from 'app/@components/base/base.component';
import {ERROR, SUCCESS} from '../../../@core/data/data';
import {Route} from '../../../@core/data/route';
import {authOptions} from '../../auth.settings';

@Component({
    selector: 'ngx-register-confirm',
    templateUrl: './register-confirm.component.html',
})
export class NgxRegisterConfirmComponent extends BaseComponent implements OnInit {

    redirectDelay: number = authOptions.forms.logout.redirectDelay;
    confirm: any = {};

    constructor(
        protected router: Router,
        private route: ActivatedRoute,
        private authService: AuthService) {
        super();
    }

    ngOnInit(): void {
        this.hasConfirmRoute();
    }

    hasConfirmRoute() {

        this.confirm.email = this.route.snapshot.paramMap.get('email');

        this.confirm.token = this.route.snapshot.paramMap.get('confirm_token');

        if (this.confirm.email && this.confirm.token) {
            this.spinnerShow();
            this.authService.registerConfirmation(this.confirm).subscribe(data => {
                this.spinnerHide();
                if (data.success) {
                    this.showMessage(
                        this.translate('title.Check_Registration'),
                        this.translate(data.message),
                        SUCCESS,
                        Route.PUBLIC.LOGIN
                    );
                } else {
                    this.showMessage(
                        this.translate('title.Check_Registration'),
                        this.translate(data.message),
                        ERROR,
                        Route.PUBLIC.REGISTER
                    );
                }
            }, error => {
                this.spinnerHide();
                this.showMessage(
                    this.translate('title.Check_Registration'),
                    this.translate(error.error.message),
                    ERROR,
                    Route.PUBLIC.REGISTER
                );
            });
        }
    }
}
