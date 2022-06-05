import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { GameDashboardModule } from './games/game-dashboard/game-dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { PagesMenu } from './pages-menu';
import { SharedModule } from '../shared/shared.module';
import { DialogMessageComponent } from 'app/@components/dialog-message/dialog-message.component';
import { NbContextMenuModule, NbMenuModule } from '@nebular/theme';
import { GiftsModule } from './gifts/gifts.module';
import { ReportModule } from './report/report.module';

const PAGES_COMPONENTS = [
    PagesComponent,
    DialogMessageComponent
];

@NgModule({
    imports: [
        CommonModule,
        PagesRoutingModule,
        GameDashboardModule,
        SharedModule,
        MiscellaneousModule,
        NbMenuModule,
        NbContextMenuModule,
        GiftsModule,
        ReportModule
    ],
    declarations: [
        ...PAGES_COMPONENTS,
    ],
    providers: [
        PagesMenu,
    ],
})
export class PagesModule {
}
