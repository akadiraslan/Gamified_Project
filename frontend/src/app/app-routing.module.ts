import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './@auth/auth.guard';
import { DomainGuard } from './@auth/domain.guard';

const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('app/@auth/auth.module').then(m => m.AuthModule),
    },
    {
        path: '',
        // canActivate: [AuthGuard, DomainGuard],
        loadChildren: () => import('app/pages/pages.module').then(m => m.PagesModule),
    },
    { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
    useHash: false,
};

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
