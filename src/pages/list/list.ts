import { Component } from '@angular/core';
import {NavController, NavParams, AlertController, ModalController} from 'ionic-angular';
import {FormBuilder} from "@angular/forms";
import {OrderService} from "../../util/services/order.service";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController,
  public modalCtrl: ModalController,
  private alertController: AlertController,
  public orderService:OrderService,
  private fb:FormBuilder) {
    this.orderService.getOrders().subscribe(data=>{
      cosole.log(data);
    })
  }


}
