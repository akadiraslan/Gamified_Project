import { Injectable } from '@angular/core';
import { USER, ADMIN, DEMO } from '../@core/data/data';
import { Router } from '@angular/router';
import { Route } from '../@core/data/route';
import { environment } from '../../environments/environment';


@Injectable()
export class StorageService {

    constructor(private router: Router) {
    }


    clearStorage() {
        localStorage.clear();
    }

    setLoginData(loginData) {
        localStorage.setItem('loginData', loginData);
    }
    getLoginData() {
        return localStorage.getItem('loginData');
    }
    setUserId(userId) {
        localStorage.setItem('userId', userId);
    }
    getUserId() {
        return localStorage.getItem('userId');
    }


}
