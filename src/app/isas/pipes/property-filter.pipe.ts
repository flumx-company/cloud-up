import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'propertyFilter'})
export class PropertyFilterPipe implements PipeTransform {
  transform(values: string[], args?: string[]): string[] {
    if (!args) {
      return values;
    }

    return values.filter(key => !args.includes(key));
  }
}
