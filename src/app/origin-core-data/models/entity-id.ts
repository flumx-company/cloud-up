export class EntityId {
  constructor(init?: Partial<EntityId>) {
    Object.assign(this, init);
  }

  id: string|undefined;
  name: string|undefined;
  tenant: number|undefined;
}
