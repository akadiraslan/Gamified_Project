import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { NbMenuItem } from '@nebular/theme';
import { PagesMenu } from './pages-menu';
import { InitUserService } from '../@theme/services/init-user.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { MessageService } from 'app/@core/mock/common/message.service';
import { Router } from '@angular/router';
import { StorageService } from 'app/services/storage.service';

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
export class PagesComponent implements OnDestroy, OnInit {

    menu: NbMenuItem[];
    alive: boolean = true;

    constructor(private pagesMenu: PagesMenu,
        private permissionsService: NgxPermissionsService,
        protected initUserService: InitUserService,
        private messageService: MessageService,
        protected router: Router, private storageService: StorageService
    ) {
        this.initMenu();

    }
    ngOnInit(): void {
        if (!this.messageService.loginData && !this.storageService.getUserId()) {
            this.router.navigateByUrl('/auth/login');
        }
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
