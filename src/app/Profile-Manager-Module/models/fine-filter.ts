import {EntityId} from './entity-id';

export class FineFilter {
  constructor(init?: Partial<FineFilter>) {
    Object.assign(this, init);
  }

  filterId?: EntityId;
  filterType?: string;
  active?: boolean;
}
