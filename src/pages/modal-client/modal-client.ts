import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {OrderService} from "../../util/services/order.service";

/**
 * Generated class for the ModalClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal-client',
  templateUrl: 'modal-client.html',
})
export class ModalClientPage {
  clients:any;
  search:any="";
  constructor(public orderService:OrderService,public navCtrl: NavController,public viewCtrl: ViewController, public navParams: NavParams) {
      this.orderService.getClients().subscribe(data=>{
        console.log(data);
        this.clients=data;
      })
  }

  selectClient(client){
    this.viewCtrl.dismiss(client);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalClientPage');
  }

  back(){
      this.viewCtrl.dismiss();
  }
}
