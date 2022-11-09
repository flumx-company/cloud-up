export class EntityId {
  constructor(init?: Partial<EntityId>) {
    Object.assign(this, init);
  }
  name = '';
  tenant = 0;
}
