
import { NgModule } from '@angular/core';

import { GameDashboardComponent } from './game-dashboard.component';
import { SharedModule } from '../../../shared/shared.module';
import { NbContextMenuModule, NbWindowModule } from '@nebular/theme';
import { NgxPaginationModule } from 'ngx-pagination';
import { TestGameWheelComponent } from './test-game-wheel/test-game-wheel.component';
import { PairingComponent } from './test-game-wheel/pairing/pairing.component';
import { ChoiceComponent } from './test-game-wheel/choice/choice.component';
import { SelectionComponent } from './test-game-wheel/selection/selection.component';
import { TestGameReportComponent } from './test-game-wheel/test-game-report/test-game-report.component';
import { NgxWheelModule } from 'ngx-wheel';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GiftsComponent } from './test-game-wheel/gifts/gifts.component';
import { NgxAudioPlayerModule } from 'ngx-audio-player';

@NgModule({
    imports: [
        SharedModule,
        NbContextMenuModule,
        NgxPaginationModule,
        NbWindowModule.forChild(),
        NgxWheelModule,
        DragDropModule,
        NgxAudioPlayerModule,
    ],
    declarations: [
        SelectionComponent,
        PairingComponent,
        ChoiceComponent,
        GameDashboardComponent,
        TestGameWheelComponent,
        TestGameReportComponent,
        GiftsComponent
    ],
})

export class GameDashboardModule { }
