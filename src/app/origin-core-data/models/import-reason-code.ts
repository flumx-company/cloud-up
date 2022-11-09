import {InsertMetaData} from '../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../shared/models/update-meta-data';

export class ImportReasonCode {
  constructor(init?: Partial<ImportReasonCode>) {
    Object.assign(this, init);
  }

  id?: number;
  tenant: number;
  originId?: string;
  originGroupId?: string;
  amountTypeClass?: string;
  amountTypeIdentifier?: string;
  externalReason?: string;
  insertMetadata = new InsertMetaData();
  updateMetadata = new UpdateMetaData();
  version?: string;
  uuid?: string;
}
