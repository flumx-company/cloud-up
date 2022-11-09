import {ListObject} from '../../../shared/models/list-object';

export class Period {
  static readonly list = [
    new ListObject({displayName: 'Weekly', technicalName: 'WEEKLY'}),
    new ListObject({displayName: 'Monthly', technicalName: 'MONTHLY'}),
    new ListObject({displayName: 'Quarterly', technicalName: 'QUARTERLY'}),
    new ListObject({displayName: 'Half-yearly', technicalName: 'HALFYEARLY'}),
    new ListObject({displayName: 'Yearly', technicalName: 'YEARLY'})
  ];
}