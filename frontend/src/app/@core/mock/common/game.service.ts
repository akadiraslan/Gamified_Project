import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { Route } from '../../data/route';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class GameService {

    constructor(private apiService: ApiService) {
    }

    createGame(data: any): Observable<any> {
        return this.apiService.post(`${Route.GAMES}`, data).pipe(catchError(this.formatError));
    }

    getExample(): Observable<any> {
        return this.apiService.get('http://localhost:8080/api/questions').pipe();
    }

    loginService(data: any): Observable<any> {
        return this.apiService.get('http://localhost:8080/api/user/' + data.email + '' + '/' + data.password
            + '').pipe();
    }

    getAllTestService(): Observable<any> {
        return this.apiService.get('http://localhost:8080/api/tests').pipe();
    }

    getTestService(data): Observable<any> {
        return this.apiService.get('http://localhost:8080/api/test/' + data + '').pipe();
    }

    registerService(data: any): Observable<any> {
        return this.apiService.post('http://localhost:8080/api/user', data).pipe();
    }

    updateGame(gameId: number, data: any): Observable<any> {
        return this.apiService.put(`${Route.GAMES}` + '/' + gameId, data).pipe(catchError(this.formatError));
    }

    getGames(page: any = null, limit: number = 12, organisationId: number = null): Observable<any> {

        if (page === null) {
            if (organisationId === null) {
                return this.apiService.get(`${Route.GAMES}`).pipe(catchError(this.formatError));
            } else {
                return this.apiService.get(`${Route.GAMES}` +
                    '?organisation_id=' + organisationId).pipe(catchError(this.formatError));
            }
        } else {
            if (organisationId === null) {
                return this.apiService.get(`${Route.GAMES}` + '?page=' + page + '&limit=' + limit)
                    .pipe(catchError(this.formatError));
            } else {
                return this.apiService.get(`${Route.GAMES}` + '?page=' + page + '&limit=' +
                    limit + '&organisation_id=' + organisationId)
                    .pipe(catchError(this.formatError));
            }

        }
    }

    getGame(id: number): Observable<any> {
        return this.apiService.get(`${Route.GAMES}` + '/' + id)
            .pipe(catchError(this.formatError));
    }

    getScormPackage(gameId: any, version: string): Observable<any> {
        return this.apiService.download(`${Route.SCORM_DOWNLOAD}` + '/' + gameId + '/' + version)
            .pipe(catchError(this.formatError));
    }

    download(path: any): Observable<any> {
        return this.apiService.download(path)
            .pipe(catchError(this.formatError));
    }

    formatError(error: any) {
        return of(environment.apiUrl + error.error);
    }

    checkGame(data: any): Observable<any> {
        return this.apiService.get(`${Route.CHECK_GAME}`, data)
            .pipe(catchError(this.formatError));
    }


}

