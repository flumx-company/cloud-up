import {EntityId} from './entity-id';

export class ProcessingProfileSequence {
  constructor(init?: Partial<ProcessingProfileSequence>) {
    Object.assign(this, init);
  }

  sequenceId: EntityId|undefined;
  active: boolean|undefined;
  description: string|undefined;
}
