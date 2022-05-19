import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Route} from '../@core/data/route';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor(private http: HttpClient) {
  }

  getUser() {
    return this.http.get(`${environment.apiUrl + Route.GET_USER}`);
  }
}
