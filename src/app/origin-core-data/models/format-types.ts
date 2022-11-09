import {EnumClass} from './enum-class';

export class OriginFormatTypes {
  static readonly list = [
    new EnumClass({technicalName: 'UNSTRUCTURED', displayName: 'Unstructured'}),
    new EnumClass({technicalName: 'STRUCTURED', displayName: 'Structured'})
  ];
}
