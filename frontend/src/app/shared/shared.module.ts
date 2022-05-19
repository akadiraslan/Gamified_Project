import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NebularModule } from './nebular/nebular.module';
import { ThemeModule } from '../@theme/theme.module';
import { NbMenuModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { ngfModule } from 'angular-file';
import { NgxPermissionsModule } from 'ngx-permissions';
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        NebularModule,
        ThemeModule,
        NbMenuModule,
        RouterModule,
        TranslateModule,
        ngfModule,
    ],
    exports: [
        TranslateModule,
        ReactiveFormsModule,
        FormsModule,
        NebularModule,
        ThemeModule,
        NbMenuModule,
        RouterModule,
        ngfModule,
        NgxPermissionsModule,
    ],
})
export class SharedModule {
}
