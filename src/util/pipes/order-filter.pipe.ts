import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'dataFilterOrder'
})
export class OrderFilterPipe implements PipeTransform {

    transform(array: any[], searchInput: string): any {

      if (searchInput && searchInput!="" ) {
        let array_result_temp:any=[];
        array_result_temp= _.filter(array, row=>row['numero'].toLowerCase().indexOf(searchInput.toLowerCase()) > -1);
        if(array_result_temp.length>0){
            array=array_result_temp;
        }
        if(array_result_temp.length==0){
          array_result_temp= _.filter(array, row=>row['nme'].toLowerCase().indexOf(searchInput.toLowerCase()) > -1);
        }
        if(array_result_temp.length>0){
          array=array_result_temp;
        }

        if(array_result_temp.length==0){
          array_result_temp= _.filter(array, row=>row['maquina'].toLowerCase().indexOf(searchInput.toLowerCase()) > -1);
        }
        array=array_result_temp;
      }

      return array;
    }
}
