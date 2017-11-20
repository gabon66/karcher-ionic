import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder} from "@angular/forms";

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

  orderPriorSelected:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public params: NavParams, public viewCtrl: ViewController,private fb:FormBuilder) {

    this.order=this.params.data;
    this.orderState=[{id:0, name:"Pendiente"},{id:3, name:"Proceso"},{id:2, name:"Cerrada"}];
    this.orderPrior=[{id:1, name:"Baja"},
      {id:2, name:"Media"},
      {id:3, name:"Alta"},
    ];

    this.orderStateSelected=this.orderState[0];
    this.orderPriorSelected=this.orderPrior[0];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalOrderPage');
  }
  back(){
    this.viewCtrl.dismiss();
  }

}
