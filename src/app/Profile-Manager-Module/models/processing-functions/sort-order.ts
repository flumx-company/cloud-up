import {ListObject} from '../../../shared/models/list-object';

export class SortOrder {
  static readonly list = [
    new ListObject({displayName: 'Ascending', technicalName: 'ASCENDING'}),
    new ListObject({displayName: 'Descending', technicalName: 'DESCENDING'})
  ];
}