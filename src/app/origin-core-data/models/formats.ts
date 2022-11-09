import {EnumClass} from './enum-class';

export class OriginFormats {
  static readonly list = [
    new EnumClass({technicalName: 'BPI', displayName: 'BPI'}),
    new EnumClass({technicalName: 'TIS', displayName: 'TIS'}),
    new EnumClass({technicalName: 'BAI2_LOCKBOX', displayName: 'BAI2 Lockbox'}),
    new EnumClass({technicalName: 'MT940', displayName: 'MT940'}),
    new EnumClass({technicalName: 'CAMT_053', displayName: 'CAMT.053'}),
    new EnumClass({technicalName: 'PAYPAL', displayName: 'Paypal'})
  ];
}
