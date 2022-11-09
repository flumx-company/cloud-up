import {InsertMetaData} from '../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../shared/models/update-meta-data';

export class RemittanceAdviceUnstructuredLine {
  constructor(init?: Partial<RemittanceAdviceUnstructuredLine>) {
    Object.assign(this, init);
  }

  entityId?: number;
  RUL_ID: string|undefined;
  RUL_INFO: string|undefined;
  insertMetadata: InsertMetaData = new InsertMetaData();
  updateMetadata: UpdateMetaData = new UpdateMetaData();
  version: string|undefined;
}