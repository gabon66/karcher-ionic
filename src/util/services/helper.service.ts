import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {environment} from "../../environment/environment";
import {Http, Headers, RequestOptions, Response, URLSearchParams} from '@angular/http';
/**
 * Created by gabo on 01/08/17.
 */
@Injectable()
export class HelperService {
  constructor(private http: HttpService) { }


  getCities(){
    let url = environment.api.baseUrlApi+"1/city";
    return this.http.get(url).map((response: Response) => response.json());
  }

  postCities(dataPost:any){
    let url = environment.api.baseUrlApi+"1/city";
    let data = new URLSearchParams();
    data.append('name', dataPost.name);
    data.append('dir', dataPost.dir);
    return this.http.post(url,data).map((response: Response) => response.json());
  }

  putCities(id,dataPost:any){
    let url = environment.api.baseUrlApi+"1/city/"+id;
    let data = new URLSearchParams();
    data.append('name', dataPost.name);
    data.append('dir', dataPost.dir);
    return this.http.put(url,data).map((response: Response) => response.json());
  }
  deleteCities(id:any){
    let url = environment.api.baseUrlApi+"1/city/"+id;
    return this.http.delete(url).map((response: Response) => response.json());
  }

  getMedSer(){
    let url = environment.api.baseUrlApi+"1/medserv";
    return this.http.get(url).map((response: Response) => response.json());
  }

  postMedSer(dataPost:any){

    let url = environment.api.baseUrlApi+"1/medserv";
    let data = new URLSearchParams();
    data.append('name', dataPost.name);
    data.append('obs', dataPost.obs);

    return this.http.post(url,data).map((response: Response) => response.json());
  }

  putMedSer(id,dataPost:any){
    //debugger
    let url = environment.api.baseUrlApi+"1/medserv/"+id;
    let data = new URLSearchParams();
    data.append('name', dataPost.name);
    data.append('obs', dataPost.obs);
    return this.http.put(url,data).map((response: Response) => response.json());
  }
  deleteMedSer(id:any){
    let url = environment.api.baseUrlApi+"1/medserv/"+id;
    return this.http.delete(url).map((response: Response) => response.json());
  }



  getRotemC(){
    let url = environment.api.baseUrlApi+"1/rotemc";
    return this.http.get(url).map((response: Response) => response.json());
  }

  postRotemc(dataPost:any){
    let url = environment.api.baseUrlApi+"1/rotemc";
    let data = new URLSearchParams();
    data.append('name', dataPost.name);
    data.append('obs', dataPost.obs);
    data.append('coords', dataPost.coords);
    data.append('dir', dataPost.dir);
    return this.http.post(url,data).map((response: Response) => response.json());
  }

  putRotemc(id,dataPost:any){
    //debugger
    let url = environment.api.baseUrlApi+"1/rotemc/"+id;
    let data = new URLSearchParams();
    data.append('name', dataPost.name);
    data.append('obs', dataPost.obs);
    data.append('coords', dataPost.coords);
    data.append('dir', dataPost.dir);
    return this.http.put(url,data).map((response: Response) => response.json());
  }
  deleteRotemc(id:any){
    let url = environment.api.baseUrlApi+"1/rotemc/"+id;
    return this.http.delete(url).map((response: Response) => response.json());
  }


  getHospitales(){
    let url = environment.api.baseUrlApi+"1/hospital";
    return this.http.get(url).map((response: Response) => response.json());
  }

  postHosp(dataPost:any){

    let url = environment.api.baseUrlApi+"1/hospital";
    let data = new URLSearchParams();
    data.append('name', dataPost.name);
    data.append('descript', dataPost.descript);
    data.append('city', dataPost.city);
    data.append('rotemc', dataPost.rotemc);
    data.append('dir', dataPost.dir);

    return this.http.post(url,data).map((response: Response) => response.json());
  }

  putHosp(id,dataPost:any){
    //debugger
    let url = environment.api.baseUrlApi+"1/hospital/"+id;
    let data = new URLSearchParams();
    data.append('name', dataPost.name);
    data.append('descript', dataPost.descript);
    data.append('city', dataPost.city);
    data.append('rotemc', dataPost.rotemc);
    data.append('dir', dataPost.dir);
    return this.http.put(url,data).map((response: Response) => response.json());
  }
  deleteHosp(id:any){
    let url = environment.api.baseUrlApi+"1/hospital/"+id;
    return this.http.delete(url).map((response: Response) => response.json());
  }


  getTransportes(){
    let url = environment.api.baseUrlApi+"1/transport";
    return this.http.get(url).map((response: Response) => response.json());
  }

  postTransp(dataPost:any){


    let url = environment.api.baseUrlApi+"1/transport";
    let data = new URLSearchParams();
    data.append('name', dataPost.name);
    data.append('descript', dataPost.descript);
    data.append('cuit', dataPost.cuit);
    data.append('rotemc', dataPost.rotemc);
    data.append('hospitals', dataPost.hospitals);
    data.append('manager', dataPost.manager);
    data.append('mail', dataPost.mail);

    return this.http.post(url,data).map((response: Response) => response.json());
  }

  putTransp(id,dataPost:any){
    //debugger
    let url = environment.api.baseUrlApi+"1/transport/"+id;
    let data = new URLSearchParams();
    data.append('name', dataPost.name);
    data.append('descript', dataPost.descript);
    data.append('cuit', dataPost.cuit);
    data.append('rotemc', dataPost.rotemc);
    data.append('hospitals', dataPost.hospitals);
    data.append('manager', dataPost.manager);
    data.append('mail', dataPost.mail);
    return this.http.put(url,data).map((response: Response) => response.json());
  }
  deleteTransp(id:any){
    let url = environment.api.baseUrlApi+"1/transport/"+id;
    return this.http.delete(url).map((response: Response) => response.json());
  }

  getRols(){
    let url = environment.api.baseUrlApi+"1/rols/0";
    return this.http.get(url).map((response: Response) => response.json());
  }
  getProtocols(){
    let url = environment.api.baseUrlApi+"1/protocols/0";
    return this.http.get(url).map((response: Response) => response.json());
  }

  getSituations(){
    let url = environment.api.baseUrlApi+"1/situation/0";
    return this.http.get(url).map((response: Response) => response.json());
  }
  pad(num:number, size:number): string {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }





}
