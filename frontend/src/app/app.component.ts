import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnalyticsService} from './@core/utils';
import {InitUserService} from './@theme/services/init-user.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'ngx-app',
    template: '<ngx-spinner></ngx-spinner>' +
        '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit, OnDestroy {

    private destroy$: Subject<void> = new Subject<void>();

    constructor(private analytics: AnalyticsService,
                private translateService: TranslateService,
                private initUserService: InitUserService) {
       // this.initUser();
        this.translateService.addLangs(['xy', 'en']);
        const browserLang = this.translateService.getBrowserLang();
        this.translateService.use(browserLang.match(/xy|en/) ? browserLang : 'en');
    }

    ngOnInit(): void {
        this.analytics.trackPageViews();
    }

    initUser() {
        this.initUserService.initCurrentUser()
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
