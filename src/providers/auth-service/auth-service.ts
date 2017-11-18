import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  private isLoggedIn = false;

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }
  // Login a user
  // Normally make a server request and store
  // e.g. the auth token
  login() : void {
    this.isLoggedIn = true;
  }

  // Logout a user, destroy token and remove
  // every information related to a user
  logout() : void {
    this.isLoggedIn = false;
  }

  // Returns whether the user is currently authenticated
  // Could check if current token is still valid
  authenticated() : boolean {

    if (localStorage.getItem('token')&& localStorage.getItem('token')!="") {
      // logged in so return true
      this.isLoggedIn=true;
    }else
    {
      this.isLoggedIn=false;
    }
    console.log("loged:"+this.isLoggedIn);
    return this.isLoggedIn;
  }

}
