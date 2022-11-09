import {MatchField} from './match-field';

export class MatchTable {
  constructor(init?: Partial<MatchTable>) {
    Object.assign(this, init);
  }

  technicalName = '';
  displayName = '';
  matchFields: MatchField[] = [];
}
