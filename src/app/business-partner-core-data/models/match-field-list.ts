import {ListObject} from '../../shared/models/list-object';

export class MatchFieldList {
  static readonly list = [
    new ListObject({technicalName: 'CONTRACT', displayName: 'Contract'}),
    new ListObject({technicalName: 'DEBITOR', displayName: 'Debitor account'}),
    new ListObject(
        {technicalName: 'CREDITOR', displayName: 'Creditor account'}),
    new ListObject(
        {technicalName: 'NOMINALACCOUNT', displayName: 'Nominal account'})
  ];
}
