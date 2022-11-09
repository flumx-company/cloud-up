import {ListObject} from '../../../shared/models/list-object';
import {FunctionTypeEnum} from './function-type-enum';

export class FunctionType {
  static readonly list = [
    new ListObject({
      displayName: 'Open Item selection',
      technicalName: FunctionTypeEnum.SELECT_OPEN_ITEMS
    }),
    new ListObject({
      displayName: 'Amount matching - Total',
      technicalName: FunctionTypeEnum.MATCH_AMOUNT_ALL
    }),
    new ListObject({
      displayName: 'Amount matching - Sub-setting',
      technicalName: FunctionTypeEnum.MATCH_AMOUNT_SUBSETTING
    })
  ];
}