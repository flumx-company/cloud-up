import {Pipe, PipeTransform} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {FormatTypeList} from '../../../../shared/models/format-type-list';

@Pipe({name: 'replaceFormatType'})
export class ReplaceFormatTypePipe implements PipeTransform {
  transform(value: string): string {
    if (isNullOrUndefined(value)) {
      return 'n/a';
    }
    const formatType =
        FormatTypeList.list.find(type => type.technicalName === value);

    if (!formatType) {
      return 'n/a';
    }
    return formatType.displayName;
  }
}
