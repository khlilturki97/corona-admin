import { Pipe, PipeTransform } from '@angular/core';
import {BASE_URL} from '../_globals/vars';

@Pipe({
  name: 'fixImagePath'
})
export class FixImagePathPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return BASE_URL + '/' + value;
  }

}
