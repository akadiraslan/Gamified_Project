import { NbMenuItem } from '@nebular/theme';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ADMIN, DEMO, USER } from '../@core/data/data';

@Injectable()
export class PagesMenu {
    role: string;

    constructor() {
    }

    getMenu(): Observable<NbMenuItem[]> {

        const menu: NbMenuItem[] = [
            {
                title: 'Games',
                icon: 'grid-outline',
                link: '/games',
                children: undefined,
            },
            {
                title: 'Report',
                icon: 'pie-chart-outline',
                link: '/report',
                children: undefined,
            },

            {
                title: 'Gifts',
                icon: 'gift-outline',
                link: '/gifts',
                home: true,
                children: undefined,
            },
        ];

        menu.push({
            title: 'Auth',
            icon: 'lock-outline',
            children: [
                {
                    title: 'Login',
                    link: '/auth/login',
                },
                {
                    title: 'Register',
                    link: '/auth/register',
                },
                {
                    title: 'Request Password',
                    link: '/auth/request-password',
                },
                {
                    title: 'Reset Password',
                    link: '/auth/reset-password',
                },
            ],
        });
        return of([...menu]);
    }
}
