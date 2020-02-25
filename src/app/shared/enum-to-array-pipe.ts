import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {
  transform(data: object): string[] {
    return Object.keys(data).map(key => data[key]);
  }
}
