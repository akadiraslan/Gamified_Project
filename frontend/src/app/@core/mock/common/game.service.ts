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

    getAllReport(): Observable<any> {
        return this.apiService.get('http://localhost:8080/api/reports').pipe();
    }

    getReport(data: any): Observable<any> {
        return this.apiService.get('http://localhost:8080/api/report/test/' + data + '').pipe();
    }

    getUserName(data: any): Observable<any> {
        return this.apiService.get('http://localhost:8080/api/user/' + data + '').pipe();
    }

    setScore(data: any): Observable<any> {
        return this.apiService.post('http://localhost:8080/api/report', data).pipe();
    }
    getGifts(): Observable<any> {
        return this.apiService.get('http://localhost:8080/api/gifts').pipe();
    }

    formatError(error: any) {
        return of(environment.apiUrl + error.error);
    }


}

