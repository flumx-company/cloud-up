export class MatchField {
  constructor(init?: Partial<MatchField>) {
    Object.assign(this, init);
  }

  technicalName = '';
  displayName = '';
}
