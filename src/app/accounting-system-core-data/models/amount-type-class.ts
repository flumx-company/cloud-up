import {ListObject} from '../../shared/models/list-object';

export class AmountTypeClass {
  static readonly list = [
    new ListObject({technicalName: 'DEDUCTION', displayName: 'Deduction'}),
    new ListObject(
        {technicalName: 'RETURNDEBITNOTE', displayName: 'Return debit note'})
  ];
}