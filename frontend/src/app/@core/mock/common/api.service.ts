import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ADMIN } from '../../data/data';

@Injectable()
export class ApiService {

    public href: string = '';
    url: string;


    constructor(private http: HttpClient, private router: Router) {
        this.href = this.router.url;
        this.getUrl();
    }

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    getExample(): Observable<any> {
        return this.http.get('http://jsonplaceholder.typicode.com/users',
        ).pipe();
    }

    getOrganisationDomain() {

    }

    getUrl() {
    }

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(path).pipe(catchError(this.formatError));
    }

    post(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.post(this.url + path, JSON.stringify(params), this.httpOptions)
            .pipe(catchError(this.formatError));
    }

    postUpload(path: string, file: FormData): Observable<any> {
        this.httpOptions.headers.append('reportProgress', 'true');
        this.httpOptions.headers.append('observe', 'events');
        const config = new HttpRequest('POST', environment.apiUrl + path, file, {
            reportProgress: true,
        });
        return this.http.post(this.url + path, file).pipe(catchError(this.formatError));
    }

    download(path: string): Observable<any> {
        return this.http.get(this.url + path)
            .pipe(catchError(this.formatError));
    }

    put(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.put(this.url + path, JSON.stringify(params), this.httpOptions)
            .pipe(catchError(this.formatError));
    }

    delete(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.delete(this.url + path, { params }).pipe(catchError(this.formatError));
    }

    formatError(error: any) {
        return of(this.url + error.error);
    }


}
