import {InsertMetaData} from '../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../shared/models/update-meta-data';

export class SearchExpression {
  constructor(init?: Partial<SearchExpression>) {
    Object.assign(this, init);
  }

  id: number|undefined;
  searchType: string|undefined;
  regularExpression: string|undefined;
  replacementPattern: string|undefined;
  prefix: number;
  separator: string|undefined;
  multipleRepetition: boolean|undefined;
  insertMetadata: InsertMetaData = new InsertMetaData();
  updateMetadata: UpdateMetaData = new UpdateMetaData();
  version: string|undefined;
  uuid = '';
}
