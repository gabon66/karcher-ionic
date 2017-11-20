import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {HttpService} from "../util/services/http.service";
import {HelperService} from "../util/services/helper.service";
import {OrderService} from "../util/services/order.service";
import {AuthServiceProvider} from "../providers/auth-service/auth-service";
import {AuthenticationService} from "../util/services/login.service";
import {MenuPage} from "../pages/menu/menu";
import {LoginPage} from "../pages/login/login";
import {HttpModule} from "@angular/http";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {ModalClientPage} from "../pages/modal-client/modal-client";
import {ClientFilterPipe} from "../util/pipes/client-filter.pipe";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MenuPage,
    ClientFilterPipe,
    ListPage,
    ModalClientPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MenuPage,
    ListPage,
    ModalClientPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpService,
    OrderService,
    HelperService,
    AuthServiceProvider,
    AuthenticationService,
  ]
})
export class AppModule {}
