import {InsertMetaData} from './insert-meta-data';
import {UpdateMetaData} from './update-meta-data';

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
