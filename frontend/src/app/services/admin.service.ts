import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Route} from '../@core/data/route';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    private baseUrl = 'http://localhost:8000/api/admin';

    constructor(private http: HttpClient) {
    }

    getAllUser() {
        return this.http.get(`${environment.apiUrl + Route.ADMIN.GET_ALL}/getAllUser`);
    }
}
