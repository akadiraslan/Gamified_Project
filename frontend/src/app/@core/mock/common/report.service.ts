import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { Route } from '../../data/route';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { ResponseType } from '../../model/response-type';


@Injectable({
    providedIn: 'root'
})
export class ReportService {


    constructor(private apiService: ApiService) {
    }

    getGeneralReport(data: any): Observable<ResponseType> {
        return this.apiService.post(`${Route.REPORT.ORGANISATION_GENERAL_REPORT}`, data)
            .pipe(catchError(this.formatError));
    }

    getGameReport(data: any): Observable<ResponseType> {
        return this.apiService.post(`${Route.REPORT.GAME_REPORT}`, data)
            .pipe(catchError(this.formatError));
    }

    getGameDetailReport(data: any): Observable<any> {
        return this.apiService.post(`${Route.REPORT.GAME_DETAIL_REPORT}`, data)
            .pipe(catchError(this.formatError));
    }

    getBestListReport(data: any): Observable<any> {
        return this.apiService.post(`${Route.REPORT.BEST_LIST_REPORT}`, data)
            .pipe(catchError(this.formatError));
    }

    getCategoryDetailReport(data: any): Observable<any> {
        return this.apiService.post(`${Route.REPORT.CATEGORY_GENERAL_REPORT}`, data)
            .pipe(catchError(this.formatError));
    }

    getQuestionGeneralReport(data: any): Observable<any> {
        return this.apiService.post(`${Route.REPORT.QUESTION_GENERAL_REPORT}`, data)
            .pipe(catchError(this.formatError));
    }

    getLearnerGeneralReport(data: any): Observable<any> {
        return this.apiService.post(`${Route.REPORT.LEARNER_GENERAL_REPORT}`, data)
            .pipe(catchError(this.formatError));
    }
    /*updateSecurity(data: any): Observable<any> {
        return this.apiService.post(`${Route.REPORT.GAME_REPORT}`, data).pipe(catchError(this.formatError));
    }*/

    formatError(error: any) {
        return of(environment.apiUrl + error.error);
    }

    getLearners(data: any): Observable<any> {
        return this.apiService.post(`${Route.LEARNER}`, data)
            .pipe(catchError(this.formatError));
    }

    getUserGames(data: any): Observable<any> {
        return this.apiService.post(`${Route.USERGAMES}`, data)
            .pipe(catchError(this.formatError));
    }

}

