export class Sort {
  constructor(init?: Partial<Sort>) {
    Object.assign(this, init);
  }

  sorted: boolean|undefined;
  unsorted: boolean|undefined;
}
