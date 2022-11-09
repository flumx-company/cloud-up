export class Operator {
  constructor(init?: Partial<Operator>) {
    Object.assign(this, init);
  }

  technicalName = '';
  displayName = '';
}
