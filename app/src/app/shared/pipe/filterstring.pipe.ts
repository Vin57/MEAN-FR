import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'IsString'
})
export class IsStringPipe implements PipeTransform {

  transform(value: Object): boolean {
    return ((value instanceof String) || typeof(value) === 'string');
  }

}
