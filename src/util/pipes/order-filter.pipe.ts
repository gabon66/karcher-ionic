import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'dataFilterOrder'
})
export class OrderFilterPipe implements PipeTransform {

    transform(array: any[], searchInput: string): any {

      if (searchInput && searchInput!="" ) {

        array= _.filter(array, row=>row['numero'].toLowerCase().indexOf(searchInput.toLowerCase()) > -1);
      }
      return array;
    }
}
