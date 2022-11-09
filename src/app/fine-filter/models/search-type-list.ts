import {ListObject} from '../../shared/models/list-object';

export class SearchTypeList {
  static readonly list = [
    new ListObject({technicalName: 'VALUE', displayName: 'Value'}),
    new ListObject({technicalName: 'INTERVAL', displayName: 'Interval'}),
    new ListObject({technicalName: 'ENUMERATION', displayName: 'Enumeration'})
  ];
}
