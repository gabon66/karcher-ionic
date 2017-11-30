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
import {OrderFilterPipe} from "../util/pipes/order-filter.pipe";
import {OrderPendingPage} from "../pages/order-pending/order-pending";
import {OrderProcessPage} from "../pages/order-process/order-process";
import {OrderClosedPage} from "../pages/order-closed/order-closed";
import {TabOrderPage} from "../pages/tab-order/tab-order";
import {ModalOrderPage} from "../pages/modal-order/modal-order";
import {ModalAccionOrderPage} from "../pages/modal-accion-order/modal-accion-order";
import {ModalOrderCountPage} from "../pages/modal-order-count/modal-order-count";
import {ConfigPage} from "../pages/config/config";
import {MensajesPage} from "../pages/mensajes/mensajes";
import {UserService} from "../util/services/user.service";
import {Push} from "@ionic-native/push";
import { Camera } from '@ionic-native/camera';
import {ModalGooglePlacesPage} from "../pages/modal-google-places/modal-google-places";
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MenuPage,
    ClientFilterPipe,
    OrderFilterPipe,
    ListPage,
    OrderPendingPage,
    OrderProcessPage,
    OrderClosedPage,
    TabOrderPage,
    ModalOrderPage,
    ModalClientPage,
    ModalAccionOrderPage,
    ModalOrderCountPage,
    ModalGooglePlacesPage,
    ConfigPage,
    MensajesPage
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
    OrderPendingPage,
    OrderProcessPage,
    OrderClosedPage,
    TabOrderPage,
    ModalOrderPage,
    ModalClientPage,
    ModalGooglePlacesPage,
    ModalAccionOrderPage,
    ModalOrderCountPage,
    ConfigPage,
    MensajesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Push,
    Camera,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpService,
    OrderService,
    HelperService,
    UserService,
    AuthServiceProvider,
    AuthenticationService,
  ]
})
export class AppModule {}
