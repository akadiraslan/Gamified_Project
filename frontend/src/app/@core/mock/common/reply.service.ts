import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
// import { catchError } from 'rxjs/operators';
// import { Route } from './data/route';
import { environment } from 'environments/environment';


@Injectable({
    providedIn: 'root'
})
export class ReplyService {

    constructor(private apiService: ApiService) {
    }

    // reply(data: any): Observable<any> {
    //     return this.apiService.post(`${Route.SCORM.REPLY}`, data).pipe(catchError(this.formatError));
    // }

    formatError(error: any) {
        return of(environment.apiUrl + error.error);
    }


}

