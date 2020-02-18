import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform{
  transform(data: Object): string[] {
    return Object.keys(data).map(key => data[key]);
  }
}
