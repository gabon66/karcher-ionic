import {Component, EventEmitter, Output} from '@angular/core';
import {NavController, NavParams, LoadingController, ModalController, AlertController, Events} from 'ionic-angular';
import {OrderService} from "../../util/services/order.service";
import {FormBuilder} from "@angular/forms";
import {ModalOrderPage} from "../modal-order/modal-order";
import {ModalAccionOrderPage} from "../modal-accion-order/modal-accion-order";
import {ModalOrderCountPage} from "../modal-order-count/modal-order-count";

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
  @Output() cantOutput = new EventEmitter();

  search:string="";
  orders:any;
  loaderMsg:any;




  constructor(public navCtrl: NavController,
              private events: Events,
              public loadingCtrl: LoadingController,
              public modalCtrl: ModalController,
              private alertController: AlertController,
              public orderService:OrderService,
              private fb:FormBuilder) {

  }

  ionViewDidEnter(){
    this.getOrders();
  }

  openCountPage(){
    let modal
    let data:any={countname:"pendingcount"};
    modal = this.modalCtrl.create(ModalOrderCountPage,data);
    modal.present();
    modal.onDidDismiss(data=>{
      this.getOrders();
    })
  }

  getOrders(){
    this.loadMessage("Cargando Ordenes");
    let  count=localStorage.getItem("pendingcount");

    this.orderService.getOrdersCustom(count,0).subscribe(data=>{
      console.log(data);
      //debugger
      this.cantOutput.emit(data.length);
      this.events.publish('cant-pending', data.length);
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
