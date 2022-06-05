import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportComponent } from './report.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartModule } from 'angular2-chartjs';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    Ng2SmartTableModule
  ]
})
export class ReportModule { }
