import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams,public params: NavParams, public viewCtrl: ViewController) {
    this.order=this.params.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalOrderPage');
  }
  back(){
    this.viewCtrl.dismiss();
  }
}
