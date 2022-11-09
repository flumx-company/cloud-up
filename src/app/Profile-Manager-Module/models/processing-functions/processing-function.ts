import {MatchAdviceConfiguration} from './match-advice-configuration';
import {MatchAmountConfiguration} from './match-amount-configuration';
import {MatchAmountSubSettingConfiguration} from './match-amount-subsetting-configuration';
import {SelectOpenItemConfiguration} from './select-open-item-configuration';

export class ProcessingFunction {
  constructor(init?: Partial<ProcessingFunction>) {
    Object.assign(this, init);
  }

  active = false;
  functionId?: number;
  name = '';
  index = 0;
  type = '';
  description = '';
  matchAdviceConfiguration?: MatchAdviceConfiguration|null;
  matchAmountConfiguration?: MatchAmountConfiguration|null;
  matchAmountSubSettingConfiguration?: MatchAmountSubSettingConfiguration|null;
  selectOpenItemConfiguration?: SelectOpenItemConfiguration|null;

  // tslint:disable-next-line:no-any
  [key: string]: any;
}