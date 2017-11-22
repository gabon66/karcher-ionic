import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {UserService} from "../../util/services/user.service";

/**
 * Generated class for the MensajesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mensajes',
  templateUrl: 'mensajes.html',
})
export class MensajesPage {
  loaderMsg:any;
  mensajes:any=[];
  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public navParams: NavParams,public  userService:UserService) {

  }

  ionViewDidLoad() {
      this.loadMessage("Cargando Mensajes");
      this.userService.getMessages().subscribe(data=>{
        this.mensajes=data;
        this.loadMessage(null);
      })
  }

  loadMessage(msg){
    if(msg){
      this.loaderMsg = this.loadingCtrl.create({
        content:msg,
      });
      this.loaderMsg.present();
    }else {
      this.loaderMsg.dismissAll();
      this.loaderMsg=null;
    }
  }
}
