import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'dataFilterClient'
})
export class ClientFilterPipe implements PipeTransform {

    transform(array: any[], name: string): any {

      if (name && name!="" ) {
        array= _.filter(array, row=>row['name'].toLowerCase().indexOf(name.toLowerCase()) > -1);
      }

      return array;

    }


}
