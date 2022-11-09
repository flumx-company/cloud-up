import {InsertMetaData} from '../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../shared/models/update-meta-data';

export class ISASField {
  constructor(init?: Partial<ISASField>) {
    Object.assign(this, init);
  }

  id: number|undefined;
  isasTable: string|undefined;
  isasField: string|undefined;
  insertMetadata: InsertMetaData = new InsertMetaData();
  updateMetadata: UpdateMetaData = new UpdateMetaData();
  version: string|undefined;
  uuid: string|undefined;
}
