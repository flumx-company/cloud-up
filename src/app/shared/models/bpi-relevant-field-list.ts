import {ListObject} from './list-object';

export class BpiRelevantFieldList {
  static readonly list = [
    new ListObject(
        {technicalName: 'invoiceReference1', displayName: 'Invoice Number'}),
    new ListObject(
        {technicalName: 'invoiceReference2', displayName: 'ILN of Consignee'}),
    new ListObject(
        {technicalName: 'invoiceReference3', displayName: 'Market Name'})
  ];
}
