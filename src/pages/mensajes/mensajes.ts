import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  mensajes:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public  userService:UserService) {
  }

  ionViewDidLoad() {
      this.userService.getMessages().subscribe(data=>{
        this.mensajes=data;
      })
  }
}
