import {ReferenceFieldSearchType} from './reference-field-search-type';

export class ReferenceField {
  constructor(
      public fieldName: string, public searchType: ReferenceFieldSearchType) {}
}
