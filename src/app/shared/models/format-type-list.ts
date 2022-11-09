import {ListObject} from './list-object';

export class FormatTypeList {
  static readonly list = [
    new ListObject(
        {technicalName: 'BANK_STATEMENT', displayName: 'Bank Statement'}),
    new ListObject(
        {technicalName: 'REMITTANCE_ADVICE', displayName: 'Remittance Advice'}),
    new ListObject({technicalName: 'LOCKBOX', displayName: 'Lockbox'})
  ];
}
