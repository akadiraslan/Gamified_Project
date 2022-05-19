import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { NbMenuItem } from '@nebular/theme';
import { PagesMenu } from './pages-menu';
import { InitUserService } from '../@theme/services/init-user.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
    selector: 'ngx-pages',
    styleUrls: ['pages.component.scss'],
    template: `
        <ngx-one-column-layout>
            <nb-menu [items]="menu"></nb-menu>
            <router-outlet></router-outlet>
        </ngx-one-column-layout>
    `,
})
export class PagesComponent implements OnDestroy {

    menu: NbMenuItem[];
    alive: boolean = true;

    constructor(private pagesMenu: PagesMenu,
        private permissionsService: NgxPermissionsService,
        protected initUserService: InitUserService,
    ) {
        this.initMenu();
        this.setPermission();

    }

    setPermission() {
    }

    initMenu() {
        this.pagesMenu.getMenu()
            .pipe(takeWhile(() => this.alive))
            .subscribe(menu => {
                this.menu = menu;
            });
    }

    ngOnDestroy(): void {
        this.alive = false;
    }
}
