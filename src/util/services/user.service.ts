/**
 * Created by gabo on 26/07/17.
 */
import { Injectable } from '@angular/core';
import {Http, Headers, Response, URLSearchParams} from '@angular/http';
import {environment} from "../../environment/environment";
import {HttpService} from "./http.service";



@Injectable()
export class UserService {
  constructor(private http: HttpService) { }


  getProfile(){
    let url = environment.api.baseUrlApi+"1/me";
    return this.http.get(url).map((response: Response) => response.json());
  }

  getClient(){
    let url = environment.api.baseUrlApi+"client/getbyclient";
    return this.http.get(url).map((response: Response) => response.json());
  }

  updateWifiGuest(valGuest){
    let url = environment.api.baseUrlApi+"clients/"+localStorage.getItem('client_id');
    let data = new URLSearchParams();
    data.append('wifiGuest', valGuest);
    return this.http.put(url,data).map((response: Response) => response.json());
  }

  getAll() {
    let url = environment.api.baseUrlApi+"1/users/0";
    return this.http.get(url).map((response: Response) => response.json());
  }

  getById(_id: string) {
    let url = environment.api.baseUrlApi+"1/users/"+_id;
    return this.http.get(url).map((response: Response) => response.json());
  }

  putUserEasyData(id,dataPost:any){
    //debugger
    let url = environment.api.baseUrlApi+"1/user/"+id;
    let data = new URLSearchParams();
    data.append('fist_name', dataPost.name);
    data.append('last_name', dataPost.lastname);
    data.append('dni', dataPost.dni);
    data.append('phone1', dataPost.telefono2);
    data.append('phone', dataPost.telefono1);
    data.append('mail', dataPost.mail);


    return this.http.put(url,data).map((response: Response) => response.json());
    /*if (!empty($request->get("fist_name")))$user->setFirstName($request->get("fist_name"));
    if (!empty($request->get("last_name")))$user->setLastName($request->get("last_name"));
    if (!empty($request->get("dni")))      $user->setDni($request->get("dni"));
    if (!empty($request->get("matricula")))$user->setMatricula($request->get("matricula"));
    if (!empty($request->get("phone")))    $user->setPhone($request->get("phone"));
    if (!empty($request->get("phone1")))   $user->setPhone2($request->get("phone1"));
    if (!empty($request->get("rotemc")))   $user->setGroupRotem($request->get("rotemc"));
    if (!empty($request->get("shift1")))   $user->setShift1($request->get("shift1"));
    if (!empty($request->get("shift2")))   $user->setShift2($request->get("shift2"));
    if (!empty($request->get("shift3")))   $user->setShift3($request->get("shift3"));
    if (!empty($request->get("enabled")))  $user->setEnabled($request->get("enabled"));
    if (!empty($request->get("enabled")))  $user->setWorkPlace($request->get("place"));
    if (!empty($request->get("mail")))     $user->setEmail($request->get("mail"));
    if (!empty($request->get("rol")))     $user->setRotemRoles($request->get("rol"));
    */

  }


  putUserPassData(id,dataPost:any){
    //debugger
    let url = environment.api.baseUrlApi+"1/user/"+id;
    let data = new URLSearchParams();
    data.append('password', dataPost.password);

    return this.http.put(url,data).map((response: Response) => response.json());
  }


  putUserRotemCData(id, dataPost:any){

    let url = environment.api.baseUrlApi+"1/user/"+id;
    let data = new URLSearchParams();
    data.append('rotemc', dataPost.rotemc.id);
    data.append('rol', dataPost.rol.id);
    data.append('hospital', dataPost.hospital.id);
    data.append('transport', dataPost.transportes.id);
    return this.http.put(url,data).map((response: Response) => response.json());

  }

  putUserAdminata(id, dataPost:any){

    let url = environment.api.baseUrlApi+"1/user/"+id;
    let data = new URLSearchParams();
    data.append('admintrans', dataPost.admintrans);
    data.append('adminrotem', dataPost.adminrotem);

    return this.http.put(url,data).map((response: Response) => response.json());

  }


  postUserBasicData(dataPost:any){
    //debugger
    let url = environment.api.baseUrlApi+"1/api/ionic/user";
    let data = new URLSearchParams();
    dataPost.enabled=0;
    data.append('fist_name', dataPost.first_name);
    data.append('last_name', dataPost.last_name);
    data.append('dni', dataPost.dni);
    data.append('phone', dataPost.phone);
    data.append('mail', dataPost.mail);
    data.append('password', dataPost.password);
    data.append('enabled',dataPost.enabled);


    return this.http.post(url,data).map((response: Response) => response.json());

  }



}
