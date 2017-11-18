import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {HomePage} from "../home/home";
import {AuthenticationService} from "../../util/services/login.service";
import {ListPage} from "../list/list";
import {MenuPage} from "../menu/menu";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public form:FormGroup;
  public submitted:boolean = false;
  msgerror='';

  rootPage: any = HomePage;
  loaderMsg:any;

  constructor(public navCtrl: NavController,private alertController: AlertController,public loadingCtrl: LoadingController, public navParams: NavParams,private fb:FormBuilder, private loginService:AuthenticationService) {


    this.form = fb.group({
      'username': [localStorage.getItem('username'), Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': [localStorage.getItem('password'), Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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

  public onSubmit(values:any):void {

    //this.loader.present();


    this.submitted = true;
    if (this.form.valid) {

      this.loadMessage("Validando credenciales");
      this.loginService.login(values.username,values.password).subscribe(dataLogin=>{
        // get me profile
        this.loadMessage(null);
        localStorage.setItem("token",dataLogin.tokenLogin)

        //this.navCtrl.first();
        this.navCtrl.push(MenuPage);

      },error=>{
        console.log(error);
        this.loadMessage(null);
        this.msgerror="Error de credenciales";
      });
    }
  }


}
