import { Component } from '@angular/core';
import {NavController, NavParams, ViewController, AlertController} from 'ionic-angular';
import {FormBuilder} from "@angular/forms";
import {OrderService} from "../../util/services/order.service";
import {URLSearchParams} from "@angular/http";

/**
 * Generated class for the ModalAccionOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal-accion-order',
  templateUrl: 'modal-accion-order.html',
})
export class ModalAccionOrderPage {

  order:any;

  orderState:any=[];
  orderPrior:any=[];

  orderStateSelected:any;
  obs:any="";
  orderPriorSelected:any;

  me:any;
  constructor(public navCtrl: NavController,
              public orderService:OrderService,
              public navParams: NavParams,
              public params: NavParams,
              private alertController: AlertController,
              public viewCtrl: ViewController,
              private fb:FormBuilder) {

    this.order=this.params.data;
    this.orderState=[{id:0, name:"Pendiente"},{id:1, name:"Proceso"},{id:2, name:"Cerrada"}];
    this.obs=this.order.obs;
    this.me=JSON.parse(localStorage.getItem("me"));


    for(let state of this.orderState){
      if (state.id==this.order.estd){
        this.orderStateSelected=state;
      }
    }
  }


  saveObs(){

    let data = new URLSearchParams();
    this.order.obs=this.obs;
    data.append('obs',  this.order.obs);

    this.orderService.updateOrderObs(this.order.id,data ).subscribe(data=>{

      let alert = this.alertController.create({
        title: 'Orden',
        subTitle: 'Actualizada con éxito',
        buttons: ['Aceptar']
      });
      //this.nav.push(LoginPage);
      alert.present();
      this.viewCtrl.dismiss();
    })
  }

  autoAsign(){
    let data = new URLSearchParams();
    this.order.obs=this.obs;
    data.append('tecnico',this.me.id);
    data.append('estado', this.orderStateSelected.id);
    data.append('obs',  this.order.obs);

    this.orderService.updateOrder(this.order.id,data ).subscribe(data=>{


      let alert = this.alertController.create({
        title: 'Orden',
        subTitle: 'Actualizada con éxito',
        buttons: ['Aceptar']
      });
      //this.nav.push(LoginPage);
      alert.present();
      this.viewCtrl.dismiss();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalOrderPage');
  }
  back(){
    this.viewCtrl.dismiss();
  }

  onSelectChange(event:any){


    let data = new URLSearchParams();
    this.order.obs=this.obs;
    data.append('tecnico',this.order.tecnico_id );
    data.append('estado', this.orderStateSelected.id);
    data.append('obs',  this.order.obs);

    this.orderService.updateOrder(this.order.id,data ).subscribe(data=>{

      let alert = this.alertController.create({
        title: 'Orden',
        subTitle: 'Actualizada con éxito',
        buttons: ['Aceptar']
      });
      //this.nav.push(LoginPage);
      alert.present();
      this.viewCtrl.dismiss();
    })
  }

}
