
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserData } from '../../interfaces/common/users';

import { UsersService } from './users.service';
import { SettingsData } from '../../interfaces/common/settings';
import { SettingsService } from './settings.service';
import { AppInjectorService } from './app-injector.service';
import { MessageService } from './message.service';
import { ApiService } from './api.service';
import { GameService } from './game.service';
import { GiftService } from './gift.service';
import { ReplyService } from './reply.service';
import { ThemeService } from './theme.service';
import { PackageService } from './package.service';
import { ReportService } from './report.service';
import { StatusReportsService } from './statusReports.service';
import { StatusReportsData } from '../../interfaces/common/statusReports';

const SERVICES = [
    { provide: UserData, useClass: UsersService },
    { provide: SettingsData, useClass: SettingsService },
    { provide: AppInjectorService, useClass: AppInjectorService },
    { provide: ApiService, useClass: ApiService },
    { provide: MessageService, useClass: MessageService },
    { provide: GameService, useClass: GameService },
    { provide: GiftService, useClass: GiftService },
    { provide: ReplyService, useClass: ReplyService },
    { provide: ThemeService, useClass: ThemeService },
    { provide: PackageService, useClass: PackageService },
    { provide: ReportService, useClass: ReportService },
    { provide: StatusReportsData, useClass: StatusReportsService },
];

@NgModule({
    imports: [CommonModule],
})
export class CommonMockModule {
    static forRoot(): ModuleWithProviders<CommonMockModule> {
        return {
            ngModule: CommonMockModule,
            providers: [
                ...SERVICES,
            ],
        };
    }
}
