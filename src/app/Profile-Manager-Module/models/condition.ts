import {InsertMetaData} from '../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../shared/models/update-meta-data';

import {ConditionPart} from './condition-part';
import {EntityId} from './entity-id';

export class Condition {
  constructor(init?: Partial<Condition>) {
    Object.assign(this, init);
  }

  entityId = new EntityId();
  status = 'INACTIVE';
  active = false;
  parts: ConditionPart[] = [];
  insertMetadata: InsertMetaData = new InsertMetaData();
  updateMetadata: UpdateMetaData = new UpdateMetaData();
  version: string|undefined|null;
  processProfile = '';
  description = '';
  formatType: string|undefined|null;

  // tslint:disable-next-line:no-any
  [key: string]: any;
}
