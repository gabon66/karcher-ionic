/**
 * Created by gabo on 14/11/17.
 */
import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {environment} from "../../environment/environment";
import {Http, Headers, RequestOptions, Response, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable'
/**
 * Created by gabo on 01/08/17.
 */
@Injectable()
export class OrderService {
  constructor(private http: HttpService) { }


  getNewOrder(){
    let url = environment.api.baseUrlApi+"movil/order/new";
    return this.http.get(url).map((response: Response) => response.json());
  }

  getMaterialByBarra(number ,barra){
    let url = environment.api.baseUrlApi+"movil/material/pn/"+number+"/"+barra;
    return this.http.get(url).map((response: Response) => response.json());
  }

  getClients(){
    let url = environment.api.baseUrlApi+"movil/clientes";
    return this.http.get(url).map((response: Response) => response.json());
  }

  saveOrder(dataPost:any){
    let url = environment.api.baseUrlApi+"movil/order";
    return this.http.post(url,dataPost)
      .map((response: Response) => response.json())
      .catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  updateOrder(id , dataPost:any){
    let url = environment.api.baseUrlApi+"movil/order/"+id;
    return this.http.put(url,dataPost)
      .map((response: Response) => response.json())
      .catch((err: Response) => {
        return Observable.throw(err);
      });
  }


  updateOrderObs(id , dataPost:any){
    let url = environment.api.baseUrlApi+"movil/order/obs/"+id;
    return this.http.put(url,dataPost)
      .map((response: Response) => response.json())
      .catch((err: Response) => {
        return Observable.throw(err);
      });
  }


  getOrders(){
    let url = environment.api.baseUrlApi+"movil/orders";
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  getOrdersCustom(count, state){

    let url = environment.api.baseUrlApi+"movil/orderscustom/"+count+"/"+state;
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch((err: Response) => {
        return Observable.throw(err);
      });
  }




}
