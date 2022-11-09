import {InsertMetaData} from '../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../shared/models/update-meta-data';

export class ExportReasonCode {
  constructor(init?: Partial<ExportReasonCode>) {
    Object.assign(this, init);
  }

  id?: number;
  amountTypeClass?: string;
  amountTypeIdentifier?: string;
  externalReason?: string;
  insertMetadata = new InsertMetaData();
  updateMetadata = new UpdateMetaData();
  version?: string;
  uuid?: string;
}