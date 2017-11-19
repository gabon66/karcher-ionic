import { Component } from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {OrderService} from "../../util/services/order.service";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";

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

  userId:number;
  userLevel:number;

  ordertype:any;
  step:number=1;
  maquina_id:any;
  client_id:any;
  orderUsersDist:any=[];
  ordertec:any;
  constructor(public navCtrl: NavController,private barcodeScanner: BarcodeScanner,private alertController: AlertController,public orderService:OrderService,private fb:FormBuilder) {
    this.form = fb.group({
      'date': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'type_ord': [1],
      'user_rec': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'distri': ['', Validators.compose([Validators.required, Validators.minLength(4)])],

      'barra': ['16672290010427', Validators.compose([Validators.required, Validators.minLength(4)])],
      'n_parte': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'modelo': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'serie': ['', Validators.compose([Validators.required, Validators.minLength(4)])],

      'cliente': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'contacto': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
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

      'prior': [''],
      'tecnico_assign': [''],
      'state': [''],
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
        console.log(barcodeData);

      }
    }, (err) => {
      let alert = this.alertController.create({
        title: 'Error',
        subTitle: 'Error al escanear imagen, intente nuevamente o ingrese el codigo a mano',
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
        /*$scope.client_from_old_orden=response.data.cliente;
        $scope.cliente_id=$scope.client_from_old_orden.id;
        $scope.cliente=$scope.client_from_old_orden.name;
        $scope.contacto=$scope.client_from_old_orden.contacto;
        $scope.phone=$scope.client_from_old_orden.phone;
        $scope.mail=$scope.client_from_old_orden.mail;
        */
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
              "name":this.form.controls.user_rec.getValue()})
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


      /*

       if(orden.data.dist){
       if (orden.data.dist.dir){
       $scope.ordenValid=true;
       $scope.countryName= orden.data.dist.dir.split(",")[orden.data.dist.dir.split(",").length-1].toUpperCase().trim();


       $scope.newNumOrder=$scope.countryName.substring(0,2)+ ("0000"+orden.data.user.idDistribuidor).slice(-4)+("0000"+orden.data.next).slice(-4)
       $scope.distName=orden.data.dist.name;
       $scope.distId =orden.data.dist.id;

       $scope.userName=orden.data.user.lastName + " "+orden.data.user.name;
       $scope.userName_id=orden.data.user.id;
       $scope.user_level=orden.data.user.level;


       if (orden.data.usersDist){
       for (var e = 0; e < orden.data.usersDist.length; e++) {
       $scope.orderUsersDist.push({"id": orden.data.usersDist[e].id,
       "name":orden.data.usersDist[e].lastName + " "+orden.data.usersDist[e].name})
       }
       }else {
       $scope.orderUsersDist.push({"id": 1,
       "name":"Autoasignar"})
       }

       if($scope.user_level==6){
       $scope.ordertype=$scope.orderType[4];
       $scope.orderUsersDist=[];
       $scope.orderUsersDist.push({"id":$scope.userName_id,
       "name":$scope.userName})
       $scope.ordertec=$scope.orderUsersDist[0];
       }


       }else {
       $scope.ordenValid=false;
       $scope.errorMsg="No tiene una dirección valida asiganada a su punto de distribución";
       }
       }else {
       $scope.ordenValid=false;
       $scope.errorMsg="No tiene punto de distribución asociado para cargar ordenes.";
       }
       */

    })
  }

}
