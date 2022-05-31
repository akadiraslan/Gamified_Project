import {TranslateService} from '@ngx-translate/core';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AppInjectorService} from 'app/@core/mock/common/app-injector.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {DANGER, DEMO, ERROR, INFO, SUCCESS} from 'app/@core/data/data';
import {NgxPermissionsService} from 'ngx-permissions';


export abstract class BaseComponent {

    public messages = [];
    public status: string;

    protected spinner;
    protected translateService;
    protected router;
    protected permissionsService;

    protected constructor() {
        this.translateService = AppInjectorService.injector.get(TranslateService);
        this.router = AppInjectorService.injector.get(Router);
        this.spinner = AppInjectorService.injector.get(NgxSpinnerService);
        this.permissionsService = AppInjectorService.injector.get(NgxPermissionsService);
    }

    handleResponse(data) {
        this.messages = [];
        this.messages.push(data.message);
        if (data.status === SUCCESS) {
            this.status = INFO;
        } else if (data.status === ERROR) {
            this.handleError(data);
        } else {
            this.handleError(data);
        }
    }

    public handleError(error) {
        this.messages = [];
        if (error.error.errors) {
            const err = error.error.errors;
            Object.values(err).forEach((data: string) => {
                this.messages.push(Object.values(this.translateService.instant(data)));
            });
        } else {
            this.messages.push(this.translateService.instant(error.error.message));
        }

        this.status = DANGER;
    }

    public spinnerShow(): void {
        return this.spinner.show();
    }

    public spinnerHide(): void {
        return this.spinner.hide();
    }

    public deleteConfirm(title: string, message: string) {
        return Swal.fire({
            title,
            text: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: this.translateService.instant('Yes')
        });
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

    translate(data: any) {
        if (typeof data !== 'undefined') {
            return this.translateService.instant(data);
        } else {
            return data;
        }

    }
}
