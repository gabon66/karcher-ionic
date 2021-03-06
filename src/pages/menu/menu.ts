import {Component, ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import { Nav, Platform } from 'ionic-angular';
import {ListPage} from "../list/list";
import {TabOrderPage} from "../tab-order/tab-order";
import {ConfigPage} from "../config/config";
import {MensajesPage} from "../mensajes/mensajes";
/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabOrderPage;

  pages: Array<{title: string, component: any}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pages = [
      { title: 'Nueva Orden', component: HomePage },
      { title: 'Control de Ordenes', component: TabOrderPage },
      { title: 'Bandeja de Entrada', component: MensajesPage },
      { title: 'Configuración', component: ConfigPage }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }



}
