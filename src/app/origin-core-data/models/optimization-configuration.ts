import {InsertMetaData} from './insert-meta-data';
import {UpdateMetaData} from './update-meta-data';

export class OptimizationConfiguration {
  constructor(init?: Partial<OptimizationConfiguration>) {
    Object.assign(this, init);
  }

  id?: number;
  name?: string|undefined;
  tenant?: number;
  accountingSystem?: number;
  originId?: string;
  originGroupId?: string;

  optimizationSearchMode?: string;
  delimiter?: string;
  regularExpression?: string;
  openItemField?: string;
  prefixLength?: number;

  insertMetadata: InsertMetaData|undefined;
  updateMetadata: UpdateMetaData|undefined;
  version?: string;
}
