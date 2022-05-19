import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(environment.apiUrl + path, {params}).pipe(catchError(this.formatError));
  }

  post(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.post(environment.apiUrl + path, JSON.stringify(params), this.httpOptions)
        .pipe(catchError(this.formatError));
  }

  postUpload(path: string, file: FormData): Observable<any> {
   this.httpOptions.headers.append('reportProgress', 'true');
    this.httpOptions.headers.append('observe', 'events');
    const config = new HttpRequest('POST', environment.apiUrl + path, file, {
      reportProgress: true
    });
    return this.http.post(environment.apiUrl + path, file).pipe(catchError(this.formatError));
  }

  put(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.put(environment.apiUrl + path, JSON.stringify(params), this.httpOptions)
        .pipe(catchError(this.formatError));
  }

  delete(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.delete(environment.apiUrl + path, {params}).pipe(catchError(this.formatError));
  }

  formatError(error: any) {
    return of(environment.apiUrl + error.error);
  }


}
