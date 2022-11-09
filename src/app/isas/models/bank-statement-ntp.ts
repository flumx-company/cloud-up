import {InsertMetaData} from '../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../shared/models/update-meta-data';

export class BankStatementNTP {
  constructor(init?: Partial<BankStatementNTP>) {
    Object.assign(this, init);
  }

  entityId?: number;
  NTP_ID: string|undefined;
  NTP: string|undefined;
  insertMetadata: InsertMetaData = new InsertMetaData();
  updateMetadata: UpdateMetaData = new UpdateMetaData();
  version: string|undefined;
}
