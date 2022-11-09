import {InsertMetaData} from '../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../shared/models/update-meta-data';

export class RemittanceAdviceAmount {
  constructor(init?: Partial<RemittanceAdviceAmount>) {
    Object.assign(this, init);
  }

  entityId?: number;
  AMT_TYPE: string|undefined;
  AMT_TYPE_EXT: string|undefined;
  AMT_CURR: string|undefined;
  CDTDBT_INDICATOR: string|undefined;
  AMOUNT: string|undefined;
  VALIDATED: boolean|undefined;
  insertMetadata: InsertMetaData = new InsertMetaData();
  updateMetadata: UpdateMetaData = new UpdateMetaData();
  version: string|undefined;
}
