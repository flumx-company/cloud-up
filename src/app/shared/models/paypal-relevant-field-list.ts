import {ListObject} from './list-object';

export class PaypalRelevantFieldList {
  static readonly list = [
    // todo: replace technicalName
    new ListObject({technicalName: 'todo-1', displayName: 'Invoice Id'}),
    new ListObject(
        {technicalName: 'todo-2', displayName: 'PayPal Reference Id'}),
    new ListObject({technicalName: 'todo-3', displayName: 'Custom Field'}),
    new ListObject({technicalName: 'todo-4', displayName: 'Consumer Id'}),
    new ListObject(
        {technicalName: 'todo-5', displayName: 'Payment Tracking Id'}),
    new ListObject({technicalName: 'todo-6', displayName: 'Store Id'})
  ];
}
