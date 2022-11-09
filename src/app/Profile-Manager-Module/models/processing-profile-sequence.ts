import {InsertMetaData} from '../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../shared/models/update-meta-data';

import {Condition} from './condition';
import {EntityId} from './entity-id';
import {ProcessingProfile} from './processing-profile';

export class ProcessingProfileSequence {
  constructor(init?: Partial<ProcessingProfileSequence>) {
    Object.assign(this, init);
  }

  sequenceId = new EntityId();
  active = false;
  description = '';
  // tslint:disable-next-line:no-any
  processingProfiles: any;
  insertMetadata: InsertMetaData = new InsertMetaData();
  updateMetadata: UpdateMetaData = new UpdateMetaData();
  processingProfileList: ProcessingProfile[] = [];
  version: string|undefined|null;

  prepareProfileList() {
    this.processingProfileList = [];

    if (this.processingProfiles) {
      Object.entries(this.processingProfiles).forEach((valueArray, index) => {
        const profile = valueArray[1] as ProcessingProfile;
        profile.index = index;
        profile.condition = new Condition({parts: []});
        this.processingProfileList.push(profile);
      });
    }
  }

  prepareProfileMap() {
    if (this.processingProfileList) {
      this.processingProfiles = Object.create(null);
      this.processingProfileList.forEach(
          profile => (this.processingProfiles[profile.index] = profile));

      this.processingProfileList = [];
    }
  }
}
