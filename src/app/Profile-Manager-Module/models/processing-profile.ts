import {InsertMetaData} from '../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../shared/models/update-meta-data';

import {Condition} from './condition';
import {EntityId} from './entity-id';
import {ProcessingFunction} from './processing-functions/processing-function';

export class ProcessingProfile {
  constructor(init?: Partial<ProcessingProfile>) {
    Object.assign(this, init);
  }

  profileId = new EntityId();
  index = 0;
  active = false;
  description = '';
  formatType: string|undefined|null;
  conditionName = '';
  insertMetadata: InsertMetaData = new InsertMetaData();
  updateMetadata: UpdateMetaData = new UpdateMetaData();
  condition: Condition|undefined;
  version: string|undefined|null;
  processingFunctions: ProcessingFunction[] = [];
}
