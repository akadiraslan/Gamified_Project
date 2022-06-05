import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiftsComponent } from './gifts.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartModule } from 'angular2-chartjs';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [GiftsComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    Ng2SmartTableModule
  ],
  exports: [
    GiftsComponent
  ]
})
export class GiftsModule { }
