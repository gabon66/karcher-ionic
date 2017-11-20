import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController, ModalController, AlertController} from 'ionic-angular';
import {OrderService} from "../../util/services/order.service";
import {FormBuilder} from "@angular/forms";
import {ModalOrderPage} from "../modal-order/modal-order";
import {ModalAccionOrderPage} from "../modal-accion-order/modal-accion-order";

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

  }

  ionViewDidLoad() {
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

  selectOrder(item,detail:boolean){
    let modal
    if(detail){
      modal = this.modalCtrl.create(ModalOrderPage,item);
      modal.present();
    }else {
      modal = this.modalCtrl.create(ModalAccionOrderPage,item);
      modal.present();
    }

    modal.onDidDismiss(data=>{
        this.getOrders();
    })
  }
}
