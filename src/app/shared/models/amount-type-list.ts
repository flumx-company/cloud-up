import {ListObject} from './list-object';

export class AmountTypeList {
  static readonly list = [
    new ListObject(
        {technicalName: 'INVOICEVALUE', displayName: 'Invoice Value'}),
    new ListObject(
        {technicalName: 'PAYMENTAMOUNT', displayName: 'Payment Amount'}),
    new ListObject(
        {technicalName: 'CASHDISCOUNT', displayName: 'Cash Discount'}),
    new ListObject({
      technicalName: 'DISCOUNTABLEAMOUNT',
      displayName: 'Discountable Amount'
    }),
    new ListObject({technicalName: 'DEDUCTION', displayName: 'Deduction'}),
    new ListObject(
        {technicalName: 'RETURNDEBITNOTE', displayName: 'Return Debit Note'}),
    new ListObject({technicalName: 'UNKNOWN', displayName: 'Unknown'})
  ];

  static readonly availableForReasonCodesList = [
    new ListObject({technicalName: 'DEDUCTION', displayName: 'Deduction'}),
    new ListObject(
        {technicalName: 'RETURNDEBITNOTE', displayName: 'Return Debit Note'}),
  ];
}
