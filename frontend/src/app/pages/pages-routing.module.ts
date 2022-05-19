
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { GameDashboardComponent } from './games/game-dashboard/game-dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
    path: '',
    component: PagesComponent,
    children: [
        {
            path: 'dashboard',
            component: DashboardComponent,
        },
        {
            path: 'games',
            component: GameDashboardComponent,
        },
        {
            path: 'report',

        },
        {
            path: 'users',
            loadChildren: () => import('./users/users.module')
                .then(m => m.UsersModule),
        },
        {
            path: 'miscellaneous',
            loadChildren: () => import('./miscellaneous/miscellaneous.module')
                .then(m => m.MiscellaneousModule),
        },
        {
            path: '',
            redirectTo: 'games',
            pathMatch: 'full',
        },
        {
            path: '**',
            component: NotFoundComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {
}
