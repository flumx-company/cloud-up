import {ListObject} from '../../shared/models/list-object';

export class ValidationTypeList {
  static readonly list = [
    new ListObject({technicalName: 'SINGLE', displayName: 'Single'}),
    new ListObject({technicalName: 'ALL', displayName: 'All'})
  ];
}
