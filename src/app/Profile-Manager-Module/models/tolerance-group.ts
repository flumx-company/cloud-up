export class ToleranceGroup {
  constructor(init?: Partial<ToleranceGroup>) {
    Object.assign(this, init);
  }

  toleranceGroupId?: number;
  name?: string;
}