import {Pipe, PipeTransform} from '@angular/core';
import {isNullOrUndefined} from 'util';

import {EnumClass} from '../models/enum-class';
import {OriginFormatTypes} from '../models/format-types';
import {OriginFormats} from '../models/formats';
import {OriginCharacteristicsSettings} from '../models/origin-characteristics-settings';
import {OriginGroupCharacteristicsSettings} from '../models/origin-group-characteristics-settings';

@Pipe({name: 'replaceTechnicalName'})
export class ReplaceTechnicalNamePipe implements PipeTransform {
  // tslint:disable-next-line:no-any
  transform(value: string, args?: string): any {
    if (isNullOrUndefined(value) || value.length < 1 ||
        isNullOrUndefined(args)) {
      return 'n/a';
    }

    let anyType: EnumClass|undefined;

    if (args === 'format') {
      anyType =
          OriginFormats.list.find(format => format.technicalName === value);
    } else if (args === 'formatType') {
      anyType = OriginFormatTypes.list.find(
          formatType => formatType.technicalName === value);
    } else if (args === 'originCharacteristicSetting') {
      anyType = OriginCharacteristicsSettings.list.find(
          setting => setting.technicalName === value);
    } else if (args === 'originGroupCharacteristicSetting') {
      anyType = OriginGroupCharacteristicsSettings.list.find(
          setting => setting.technicalName === value);
    }

    if (!anyType) {
      return 'n/a';
    }

    return anyType.displayName;
  }
}
