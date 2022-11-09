export class EnumClass {
  constructor(init?: Partial<EnumClass>) {
    Object.assign(this, init);
  }

  technicalName = '';
  displayName = '';
  description: string|undefined;
}
