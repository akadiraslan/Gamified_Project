
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { GameDashboardComponent } from './games/game-dashboard/game-dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { GiftsComponent } from './gifts/gifts.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [{
    path: '',
    component: PagesComponent,
    children: [
        {
            path: 'games',
            component: GameDashboardComponent,
        },
        {
            path: 'report',
            component: ReportComponent,
        },
        {
            path: 'gifts',
            component: GiftsComponent,
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
