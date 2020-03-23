import {Pipe, PipeTransform} from '@angular/core';
import {BASE_URL} from '../_globals/vars';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  transform(image: string): any {
    return BASE_URL + '/' + image;
  }

}
