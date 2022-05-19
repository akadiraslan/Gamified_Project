import { BrowserModule } from '@angular/platform-browser';

import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppInjectorService } from './@core/mock/common/app-injector.service';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { AuthModule } from './@auth/auth.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const createTranslateLoader = (http: HttpClient) => {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

import {
    NbDatepickerModule,
    NbDialogModule,
    NbMenuModule,
    NbSidebarModule,
    NbToastrModule,
    NbWindowModule,
} from '@nebular/theme';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { StoreModule } from '@ngrx/store';
import { reducers } from './@core/store/reducers';
import { UserEffects } from './@core/store/effects/user.effects';
import { AuthEffects } from './@core/store/effects/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { NgxSpinnerModule } from 'ngx-spinner';
import {NgxPermissionsModule} from 'ngx-permissions';
import { APP_BASE_HREF } from '@angular/common';
import { NgPaymentCardModule } from 'ng-payment-card';


@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AuthModule.forRoot(),
        NbSidebarModule.forRoot(),
        NbMenuModule.forRoot(),
        NbDatepickerModule.forRoot(),
        NbDialogModule.forRoot(),
        NbWindowModule.forRoot(),
        NbToastrModule.forRoot(),
        NgxPermissionsModule.forRoot(),
        StoreModule.forRoot(reducers, {}),
        EffectsModule.forRoot([AuthEffects, UserEffects]),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        CoreModule.forRoot(),
        ThemeModule.forRoot(),
        NgxSpinnerModule,
        HttpClientModule,
        NgPaymentCardModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
        }),

    ],
    exports: [StoreModule],
    bootstrap: [AppComponent],
    providers: [
        {
            provide: APP_BASE_HREF,
            useValue: window['base-href']
        },

        AuthService, ApiService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
    constructor(injector: Injector) {
        AppInjectorService.injector = injector;
    }
}
