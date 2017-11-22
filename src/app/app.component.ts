import { Component, ViewChild } from '@angular/core';
import {Nav, Platform, AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {AuthServiceProvider} from "../providers/auth-service/auth-service";
import {MenuPage} from "../pages/menu/menu";
import {LoginPage} from "../pages/login/login";
import {PushOptions, Push, PushObject} from "@ionic-native/push";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;
  constructor(public push: Push,public alertCtrl: AlertController,public platform: Platform,public auth:AuthServiceProvider,public statusBar: StatusBar, public splashScreen: SplashScreen) {


    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      if(this.auth.authenticated()) {
        this.rootPage = MenuPage;
      } else {
        this.rootPage = LoginPage;
      }
      this.pushsetup();
    });
  }

  pushsetup() {
    const options: PushOptions = {
      android: {
        //senderID: '171694798746'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {}
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => {
      if (notification.additionalData.foreground) {
        let youralert = this.alertCtrl.create({
          title: notification.title,
          message: notification.message
        });
        youralert.present();
      }
    });

    pushObject.on('registration').subscribe((registration: any) => {
      console.log(registration);

      if(registration){
        localStorage.setItem('push_token',registration.registrationId);
      }
    });
    pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  }

}
