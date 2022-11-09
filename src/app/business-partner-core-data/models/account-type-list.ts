import {ListObject} from '../../shared/models/list-object';

export class AccountTypeList {
  static readonly list = [
    new ListObject({technicalName: 'DEBITOR'}),
    new ListObject({technicalName: 'CREDITOR'}),
    new ListObject({technicalName: 'NOMINALACCOUNT'})
  ];
}
