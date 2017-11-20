import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController, ModalController, AlertController} from 'ionic-angular';
import {OrderService} from "../../util/services/order.service";
import {FormBuilder} from "@angular/forms";

/**
 * Generated class for the OrderPendingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-order-pending',
  templateUrl: 'order-pending.html',
})
export class OrderPendingPage {
  selectedItem: any;
  icons: string[];


  search:string="";
  orders:any;
  loaderMsg:any;


  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public modalCtrl: ModalController,
              private alertController: AlertController,
              public orderService:OrderService,
              private fb:FormBuilder) {
    this.getOrders();
  }

  getOrders(){
    this.loadMessage("Cargando Ordenes");
    this.orderService.getOrders().subscribe(data=>{
      console.log(data);
      this.loadMessage(null);
      this.orders=data;
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

  selectOrder(item){
    console.log(item);
  }

}
