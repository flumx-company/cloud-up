import {ListObject} from '../../shared/models/list-object';

export class OriginFormatTypes {
  static readonly list = [
    new ListObject(
        {technicalName: 'UNSTRUCTURED', displayName: 'Unstructured'}),
    new ListObject({technicalName: 'STRUCTURED', displayName: 'Structured'})
  ];
}
