import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {AuthServiceProvider} from "../providers/auth-service/auth-service";
import {MenuPage} from "../pages/menu/menu";
import {LoginPage} from "../pages/login/login";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;
  constructor(public platform: Platform,public auth:AuthServiceProvider,public statusBar: StatusBar, public splashScreen: SplashScreen) {


    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      if(this.auth.authenticated()) {
        this.rootPage = MenuPage;
      } else {
        this.rootPage = LoginPage;
      }
    });
  }
}
