import { InsertMetaData } from '../../shared/models/insert-meta-data';
import { UpdateMetaData } from '../../shared/models/update-meta-data';
import { AmountType } from './';

export interface ExternalReason {
  externalReasonId: number;
  tenant: number;
  accountingSystemType: string;
  reason: string;
  amountType: AmountType;
  insertMetadata: InsertMetaData;
  updateMetadata: UpdateMetaData;
  version: string;  
}
