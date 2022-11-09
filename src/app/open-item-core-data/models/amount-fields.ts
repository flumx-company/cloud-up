import {ListObject} from "../../shared/models/list-object";

export class AmountFields {
  static readonly list = [
    new ListObject({technicalName: 'localAmount', displayName: 'Local amount'}),
    new ListObject({technicalName: 'documentAmount', displayName: 'Document amount'})
  ];
}
