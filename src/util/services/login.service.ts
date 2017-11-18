/**
 * Created by gabo on 26/07/17.
 */
import { Injectable } from '@angular/core';
import {Http, Headers, Response, URLSearchParams, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {environment} from "../../environment/environment";

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) { }

  login(username: string, password: string) {

    let url = environment.api.baseUrlApi+"movil/login";
    //let url ="http://localhost/test/test.php";
    console.log(url);
    var headers = new Headers();
    headers.append('Content-Type', 'application/X-www-form-urlencoded');

    let options = new RequestOptions({ headers: headers });
    let data = new URLSearchParams();
    data.append('username', username);
    data.append('password', password);

    return this.http.post(url, data,options)
      .map((response: Response) => response.json())
      .catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
