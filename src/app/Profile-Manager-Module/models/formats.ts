import {ListObject} from '../../shared/models/list-object';

export class OriginFormats {
  static readonly list = [
    new ListObject({technicalName: 'BPI', displayName: 'BPI'}),
    new ListObject({technicalName: 'TIS', displayName: 'TIS'}),
    new ListObject(
        {technicalName: 'BAI2_LOCKBOX', displayName: 'BAI2 Lockbox'}),
    new ListObject({technicalName: 'MT940', displayName: 'MT940'}),
    new ListObject({technicalName: 'CAMT_053', displayName: 'CAMT.053'}),
    new ListObject({technicalName: 'PAYPAL', displayName: 'Paypal'})
  ];
}
