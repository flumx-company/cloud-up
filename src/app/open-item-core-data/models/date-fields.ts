import {ListObject} from "../../shared/models/list-object";

export class DateFields {
  static readonly list = [
    new ListObject({technicalName: 'postingDate', displayName: 'Posting date'}),
    new ListObject({technicalName: 'documentDate', displayName: 'Document date'})
  ];
}
