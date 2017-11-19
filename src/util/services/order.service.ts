/**
 * Created by gabo on 14/11/17.
 */
import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {environment} from "../../environment/environment";
import {Http, Headers, RequestOptions, Response, URLSearchParams} from '@angular/http';
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


}
