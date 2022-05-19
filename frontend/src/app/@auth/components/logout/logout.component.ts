import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Store} from '@ngrx/store';

import * as fromRoot from '../../../@core/store/reducers';
import * as authActions from '../../../@core/store/actions/auth.actions';
import {authOptions} from '../../auth.settings';

@Component({
    selector: 'ngx-logout',
    templateUrl: './logout.component.html',
})
export class NgxLogoutComponent implements OnInit {

    redirectDelay: number = authOptions.forms.logout.redirectDelay;

    constructor(protected router: Router,
                private store: Store<fromRoot.State>) {
        this.store.dispatch(new authActions.Logout(''));
    }

    ngOnInit(): void {
        this.logout();
    }

    logout(): void {
        setTimeout(() => {
            return this.router.navigateByUrl('auth/login');
        }, this.redirectDelay);
    }
}
