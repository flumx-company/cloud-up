import {InsertMetaData} from '../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../shared/models/update-meta-data';

export class Characteristic {
  constructor(init?: Partial<Characteristic>) {
    Object.assign(this, init);
  }

  id: number|undefined;
  name: string|undefined;
  tenant: number|undefined;
  originId: string|undefined;
  originGroupId: string|undefined;
  sourceField: string|undefined;
  openItemField: string|undefined;
  accountingSystem: number|undefined;
  successRate: number|undefined;
  regularExpression: string|undefined;
  insertMetadata: InsertMetaData|undefined;
  updateMetadata: UpdateMetaData|undefined;
}
