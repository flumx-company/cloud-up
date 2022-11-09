import {Pipe, PipeTransform} from '@angular/core';
import {isNullOrUndefined} from 'util';

@Pipe({name: 'replaceUndefined'})
export class ReplaceUndefinedPipe implements PipeTransform {
  transform(value: string): string {
    if (isNullOrUndefined(value)) {
      return 'n/a';
    }
    return value;
  }
}
