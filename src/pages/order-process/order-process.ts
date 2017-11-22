import { Component } from '@angular/core';
import {NavController, NavParams, AlertController, ModalController, LoadingController, Events} from 'ionic-angular';
import {ModalOrderCountPage} from "../modal-order-count/modal-order-count";
import {OrderService} from "../../util/services/order.service";
import {FormBuilder} from "@angular/forms";
import {ModalAccionOrderPage} from "../modal-accion-order/modal-accion-order";
import {ModalOrderPage} from "../modal-order/modal-order";

/**
 * Generated class for the OrderProcessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-order-process',
  templateUrl: 'order-process.html',
})
export class OrderProcessPage {

  selectedItem: any;
  icons: string[];


  search:string="";
  orders:any;
  loaderMsg:any;




  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public modalCtrl: ModalController,
              private events: Events,
              private alertController: AlertController,
              public orderService:OrderService,
              private fb:FormBuilder) {

  }



  ionViewDidEnter(){
    this.getOrders();
  }

  openCountPage(){
    let modal


    let data:any={countname:"processcount"};
    modal = this.modalCtrl.create(ModalOrderCountPage,data);

    modal.present();
    modal.onDidDismiss(data=>{
      this.getOrders();
    })
  }

  getOrders(){
    this.loadMessage("Cargando Ordenes");
    let  count=localStorage.getItem("processcount");

    this.orderService.getOrdersCustom(count,1).subscribe(data=>{
      console.log(data);
      this.events.publish('cant-proc', data.length);
      this.loadMessage(null);
      this.orders=data;
    },error=>{
      this.loadMessage(null);
      let alert = this.alertController.create({
        title: 'Error',
        subTitle: 'Error de conexión con la plataforma',
        buttons: ['Aceptar']
      });
      //this.nav.push(LoginPage);
      alert.present();
    });
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
