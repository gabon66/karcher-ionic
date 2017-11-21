import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the ModalOrderCountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal-order-count',
  templateUrl: 'modal-order-count.html',
})
export class ModalOrderCountPage {



  cants:any=[];
  cant_selected:any;

  constructor(public navCtrl: NavController, public navParams: NavParams ,public viewCtrl: ViewController) {

    this.cants=[{id:1,name:"Últimas 10",number:"10"},
      {id:1,name:"Últimas 20",number:"20"},
      {id:1,name:"Últimas 50",number:"50"},
      {id:1,name:"Últimas 100",number:"100"},
    ]

    for(let cant of this.cants){
      if (localStorage.getItem(this.navParams.data.countname)==cant.number)
      {
        this.cant_selected=cant
      }
    }
  }

  onSelectChange(event){
    localStorage.setItem(this.navParams.data.countname,this.cant_selected.number);
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalOrderCountPage');
  }
  back(){
    this.viewCtrl.dismiss();
  }
}
