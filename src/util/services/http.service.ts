/**
 * Created by gabo on 27/07/17.
 */
import {Injectable} from '@angular/core';
import {
  Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers,
  URLSearchParams
} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/mergeMap';
//node_modules/rxjs/add/operator/mergeMap

import {environment} from "../../environment/environment";


@Injectable()
export class HttpService extends Http {

  constructor (backend: XHRBackend, options: RequestOptions) {
    let token = localStorage.getItem('token'); // your custom token getter function here
    options.headers.set('token', token);
    super(backend, options);
  }


  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {

    let token = localStorage.getItem('token');
    if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
      if (!options) {
        // let's make option object
        options = {headers: new Headers()};
      }
      //options.headers.set(' X-AUTH-TOKEN', `Bearer ${token}`);
      options.headers.set('token', token);
    } else {
      // we have to add the token to the url object
      //url.headers.set(' X-AUTH-TOKEN', `Bearer ${token}`);
      url.headers.set('token', token);
    }

    return super.request(url, options)
      .catch((error) => {
          //if got authorization error - try to update access token
          if (error.status == 401) {
            return this.refreshToken()
              .flatMap((result: boolean) => {
                //if got new access token - retry request
                if (result) {
                  return this.request(url, options);
                }
                //otherwise - throw error
                else {
                  return Observable.throw(new Error('Can\'t refresh the token'));
                }

              })
              .catch(error=>{
                return Observable.throw(new Error('Can\'t refresh the token'));
              })
          }
          else {
            return Observable.throw(new Error('Error '+error.status));
          }
        })
  }



  refreshToken() :Observable<boolean>{
    let url = environment.api.baseUrlApi+"oauth/v2/token";
    //let url ="http://localhost/test/test.php";
    var headers = new Headers();
    headers.append('Content-Type', 'application/X-www-form-urlencoded');

    let options = new RequestOptions({ headers: headers });
    let data = new URLSearchParams();

    data.append('grant_type', "password");
    data.append('username', localStorage.getItem("username"));
    data.append('password', localStorage.getItem("password"));
    data.append('client_id', environment.api.client_id);
    data.append('client_secret', environment.api.client_secret);
    data.append('refresh_token', localStorage.getItem("refresh_token"));

    return this.post(url, data,options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
      //debugger
        let data = response.json();
        if (typeof data.access_token !== 'undefined'){
          localStorage.setItem('access_token',data.access_token );
          localStorage.setItem('refresh_token', data.refresh_token);
          return true;
        } else {
          return false
        }
      })
      .catch(error=>{
        return Observable.throw(new Error('Can\'t refresh the token'));
      });
  }
}
