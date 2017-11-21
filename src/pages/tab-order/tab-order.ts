import { Component } from '@angular/core';
import {NavController, NavParams, Events} from 'ionic-angular';
import {OrderPendingPage} from "../order-pending/order-pending";
import {OrderProcessPage} from "../order-process/order-process";
import {OrderClosedPage} from "../order-closed/order-closed";

/**
 * Generated class for the TabOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tab-order',
  templateUrl: 'tab-order.html',
})
export class TabOrderPage {

  tab1Root = OrderPendingPage;
  tab2Root = OrderProcessPage;
  tab3Root = OrderClosedPage;
  cantpend:any=0;
  cantproc:any=0;
  cantclosed:any=0;
  constructor(public navCtrl: NavController, public navParams: NavParams,events: Events) {
    events.subscribe('cant-pending', (data) => {
      this.cantpend=data;
    });

    events.subscribe('cant-proc', (data) => {
      this.cantproc=data;
    });

    events.subscribe('cant-closed', (data) => {

      this.cantclosed=data;
    });
  }

  getCant(cant){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabOrderPage');
  }

}
