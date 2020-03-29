import { Pipe, PipeTransform } from '@angular/core';
import {BASE_URL} from '../_globals/vars';

@Pipe({
  name: 'getStatusText'
})
export class GetStatusTextPipe implements PipeTransform {

  transform(value: any): any {
    switch (value) {
      case 0: {
        return 'Annulée';
        break;
      }
      case 1: {
        return 'Passée';
        break;
      }
      case 2: {
        return 'Confirmée';
        break;
      }
      case 3: {
        return 'En route';
        break;
      }
      case 4: {
        return 'Livrée';
        break;
      }
    }
  }

}

