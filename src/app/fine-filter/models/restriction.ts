import {InsertMetaData} from '../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../shared/models/update-meta-data';

import {EntityId} from './entity-id';
import {RestrictionPart} from './restriction-part';

export class Restriction {
  constructor(init?: Partial<Restriction>) {
    Object.assign(this, init);

    this.parts = [];
  }

  entityId: EntityId|undefined;
  status: string|undefined;
  active: boolean|undefined;
  parts: RestrictionPart[];
  insertMetadata: InsertMetaData = new InsertMetaData();
  updateMetadata: UpdateMetaData = new UpdateMetaData();
  version: string|undefined;
  accountingSystemType: string|undefined;
  description: string|undefined;
}
