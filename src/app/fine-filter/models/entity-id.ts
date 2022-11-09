export class EntityId {
  constructor(init?: Partial<EntityId>) {
    Object.assign(this, init);
  }

  name: string|undefined|null;
  tenant: number|undefined;
}
