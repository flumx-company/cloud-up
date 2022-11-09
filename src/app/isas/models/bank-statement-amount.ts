import {InsertMetaData} from '../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../shared/models/update-meta-data';

export class BankStatementAmount {
  constructor(init?: Partial<BankStatementAmount>) {
    Object.assign(this, init);
  }

  entityId?: number;
  AMT_TYPE: string|undefined;
  AMT_TYPE_EXT: string|undefined;
  AMT_CURR: string|undefined;
  CDTDBT_INDICATOR: string|undefined;
  AMOUNT: string|undefined;
  FXRATE: string|undefined;
  insertMetadata: InsertMetaData = new InsertMetaData();
  updateMetadata: UpdateMetaData = new UpdateMetaData();
  version: string|undefined;
}
