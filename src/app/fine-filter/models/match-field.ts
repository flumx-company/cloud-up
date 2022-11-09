import {InsertMetaData} from '../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../shared/models/update-meta-data';

export class MatchField {
  constructor(init?: Partial<MatchField>) {
    Object.assign(this, init);
  }

  id: number|undefined;
  matchField: string|undefined;
  accountType?: string;
  selected: boolean|undefined;
  singleMatchOnly: boolean|undefined;
  insertMetadata: InsertMetaData = new InsertMetaData();
  updateMetadata: UpdateMetaData = new UpdateMetaData();
  version: string|undefined;
  uuid: string|undefined;
  // tslint:disable-next-line:no-any
  [key: string]: any;
}
