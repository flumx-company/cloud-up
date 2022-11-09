import { InsertMetaData } from '../../shared/models/insert-meta-data';
import { UpdateMetaData } from '../../shared/models/update-meta-data';

export interface AmountType {
  amountTypeId: number;
  tenant: number;
  amountTypeIdentifier: string;
  amountTypeClass: string;
  description: string;
  predefinedType: boolean;
  insertMetadata: InsertMetaData;
  updateMetadata: UpdateMetaData;
  version: string;
}
