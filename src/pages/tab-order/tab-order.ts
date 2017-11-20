import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabOrderPage');
  }

}
