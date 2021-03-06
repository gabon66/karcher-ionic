import { Component } from '@angular/core';
import {NavController, NavParams, AlertController, ModalController, LoadingController} from 'ionic-angular';
import {FormBuilder} from "@angular/forms";
import {OrderService} from "../../util/services/order.service";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
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
