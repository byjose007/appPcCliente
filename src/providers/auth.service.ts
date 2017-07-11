import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../constantes/constants';
import { URLSearchParams, Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map'

//import {Observable} from "rxjs/Rx";

@Injectable()
export class AuthService {

   public token: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string): Observable<any> {

      let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
        return this.http.post(Constants.SERVER_IP+'/api-token-auth/', JSON.stringify({ username: username, password: password }),options)
            .map((response: Response) => {
           
                let token = response.json() && response.json().token;
                if (token) {
                  this.token = token;

                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    return true;
                } else {                  
                    return false;
                }
            });
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
        
    }
}