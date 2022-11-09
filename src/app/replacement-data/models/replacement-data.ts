import {InsertMetaData} from '../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../shared/models/update-meta-data';

export class ReplacementData {
  id?: number;
  tenantId?: number;
  replacementType?: string;
  accountingSystem?: string;
  key?: string;
  evaluationGroup?: string;
  result?: string;
  numberOfPlaces?: number | null;
  searchFeature?: string;
  insertMetadata = new InsertMetaData();
  updateMetadata = new UpdateMetaData();
}

export enum ReplacementDataType {
  SIMPLE = 'Simple replacement',
  CROSS_CHECKING = 'Replacement with cross-checking'
}
