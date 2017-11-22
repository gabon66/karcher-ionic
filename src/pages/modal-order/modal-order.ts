import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {DatePipe} from "@angular/common";

/**
 * Generated class for the ModalOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal-order',
  templateUrl: 'modal-order.html',
})
export class ModalOrderPage {

  order:any;
  time_order:string="";
  constructor(public navCtrl: NavController, public navParams: NavParams,public params: NavParams, public viewCtrl: ViewController) {
    this.order=this.params.data;
    var datePipe = new DatePipe('en-US');
    this.time_order= datePipe.transform(this.order.fing.timestamp*1000, 'dd/MM/yyyy HH:mm');

  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalOrderPage');
  }
  back(){
    this.viewCtrl.dismiss();
  }
}
