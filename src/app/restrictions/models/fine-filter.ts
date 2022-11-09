import {EntityId} from './entity-id';

export class FineFilter {
  constructor(init?: Partial<FineFilter>) {
    Object.assign(this, init);
  }

  filterId: EntityId = new EntityId();
  active = false;
}
