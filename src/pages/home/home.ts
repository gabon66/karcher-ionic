import { Component } from '@angular/core';
import {NavController, AlertController, ModalController} from 'ionic-angular';
import {OrderService} from "../../util/services/order.service";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {ModalClientPage} from "../modal-client/modal-client";
import {URLSearchParams} from "@angular/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public form:FormGroup;
  public submitted:boolean = false;
  msgerror='';

  loaderMsg:any;

  ordNumer:any;
  distId:any;

  userId:any;
  userLevel:number;

  ordertype:any;
  step:number=1;
  maquina_id:any;
  client_id:any;
  orderUsersDist:any=[];
  ordertec:any;
  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              private barcodeScanner: BarcodeScanner,
              private alertController: AlertController,
              public orderService:OrderService,
              private fb:FormBuilder) {
    this.form = fb.group({
      'date': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'type_ord': [1],
      'user_rec': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'distri': ['', Validators.compose([Validators.required, Validators.minLength(2)])],

      //'barra': ['16672290010427', Validators.compose([Validators.required, Validators.minLength(4)])],
      'barra': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'n_parte': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'modelo': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'serie': ['', Validators.compose([Validators.required, Validators.minLength(4)])],

      'cliente': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'contacto': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'telefono': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],


      'acc1': [''],
      'acc2': [''],
      'acc3': [''],
      'acc4': [''],
      'acc5': [''],
      'acc6': [''],
      'acc7': [''],
      'acc8': [''],

      'prior': [1],
      'tecnico_assign': [0],
      'state': [0],
      'obs': [''],
    });

    this.form.controls.user_rec.disable();
    this.form.controls.distri.disable();
    this.form.controls.date.disable();
    this.form.controls.n_parte.disable();
    this.form.controls.modelo.disable();
    this.form.controls.serie.disable();
    this.form.controls.n_parte.disable();

    this.getNewOrder();

  }

  ionViewDidLoad() {
  }


  next(){
    this.step++;
  }

  back(){
    this.step--;
  }


  barCode(){
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      let serial_tmp:any=barcodeData;

      //text: "012345678912", format: "UPC_A", cancelled: false
      if(!serial_tmp.cancelled){

        this.form.controls.barra.setValue(serial_tmp.text);
        this.checkBarraCode();

        console.log(barcodeData);

      }
    }, (err) => {
      let alert = this.alertController.create({
        title: 'Error',
        subTitle: err,
        buttons: ['Aceptar']
      });
      alert.present();
      // An error occurred
    });
  }

  checkBarraCode(){
    let current_bar= this.form.controls.barra.value;


    this.orderService.getMaterialByBarra(current_bar.substring(0,8),current_bar).subscribe(data=>{

      if (data.material!=null){
        let maquina:any=data.material;
        this.form.controls.serie.setValue(current_bar.substring(0,8));
        this.form.controls.modelo.setValue(maquina.name)
        this.maquina_id=maquina.id
        this.form.controls.n_parte.setValue(maquina.pn);
      }
      if (data.cliente!=null){


        this.form.controls.cliente.setValue(data.cliente.name);
        this.form.controls.contacto.setValue(data.cliente.contacto);
        this.form.controls.telefono.setValue(data.cliente.phone);
        this.form.controls.email.setValue(data.cliente.mail);
        this.client_id=data.cliente.id
      }

    })
  }


  findClient(){
    let modal = this.modalCtrl.create(ModalClientPage);
    modal.present();
    modal.onDidDismiss(data=>{
      if(data){
        this.form.controls.cliente.setValue(data.name);
        this.form.controls.contacto.setValue(data.contacto);
        this.form.controls.telefono.setValue(data.phone);
        this.form.controls.email.setValue(data.mail);
        this.client_id=data.id
      }
    })
  }


  getNewOrder(){
    this.orderService.getNewOrder().subscribe(data=>{
      console.log(data);

      if(data.dist){
        if(data.dist.dir){


          let countryName= data.dist.dir.split(",")[data.dist.dir.split(",").length-1].toUpperCase().trim();


          this.ordNumer=countryName.substring(0,2)+ ("0000"+data.user.idDistribuidor).slice(-4)+("0000"+data.next).slice(-4)
          this.form.controls.distri.setValue(data.dist.name);

          this.distId=data.dist.id;


          this.form.controls.user_rec.setValue(data.user.lastName + " "+data.user.name);
          this.form.controls.user_rec.disable();
          this.form.controls.date.setValue(new Date().toDateString());

          this.userId=data.user.id;
          this.userLevel=data.user.level;


          this.orderUsersDist.push({"id":0,name:"Sin Asignar"});
          if (data.usersDist){
            for (var e = 0; e < data.usersDist.length; e++) {
              this.orderUsersDist.push({"id": data.usersDist[e].id,
                "name":data.usersDist[e].lastName + " "+data.usersDist[e].name})
            }
          }else {
            this.orderUsersDist.push({"id": 1,
              "name":"Autoasignar"})
          }

          if(this.userLevel==6){
            //this.ordertype=this.orderType[4];
            this.orderUsersDist=[];
            this.orderUsersDist.push({"id":this.userId,
              "name":this.form.controls.user_rec.value})
            this.ordertec=this.orderUsersDist[0];
          }

        }else {
          let alert = this.alertController.create({
            title: 'Error',
            subTitle: 'No tiene una dirección valida asiganada a su punto de distribución',
            buttons: ['Aceptar']
          });
          //this.nav.push(LoginPage);
          alert.present();
        }
      }else {
        let alert = this.alertController.create({
          title: 'Error',
          subTitle: 'No tiene una dirección valida asiganada a su punto de distribución',
          buttons: ['Aceptar']
        });
        //this.nav.push(LoginPage);
        alert.present();
      }
    })
  }

  onSubmit(formData){
    console.log(formData);

    let data = new URLSearchParams();

    data.append('tipo', formData.type_ord);
    data.append('numero', this.ordNumer);
    data.append('dtr',  formData.distri);
    data.append('distId', this.distId);


    data.append('cuno', formData.cliente);
    data.append('eml', formData.email);
    data.append('phn',  formData.telefono);
    data.append('nme', formData.contacto);


    data.append('client_id', this.client_id);
    data.append('tecnico', formData.tecnico_assign);
    data.append('estado',  formData.state);
    data.append('obs', formData.obs);

    data.append('barra', formData.barra);
    data.append('serial', formData.serie);
    data.append('pn',  formData.n_parte);
    data.append('modelo', formData.modelo);
    data.append('maquina_id', this.maquina_id);

    data.append('acc1', formData.acc1);
    data.append('acc2', formData.acc2);
    data.append('acc3', formData.acc3);
    data.append('acc4', formData.acc4);

    data.append('acc5', formData.acc5);
    data.append('acc6', formData.acc6);
    data.append('acc7', formData.acc7);
    data.append('acc8', formData.acc8);

    data.append('prd', formData.prior);

    this.orderService.saveOrder(data).subscribe(data=>{
      this.form.reset();
      this.step=1;
      this.getNewOrder();
      let alert = this.alertController.create({
        title: 'Orden',
        subTitle: 'Se genero orden con éxito',
        buttons: ['Aceptar']
      });
      alert.present();

    },error=>{
      console.log(error);
    })
  }

}
