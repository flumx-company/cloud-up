import {MatchAmountConfiguration} from './match-amount-configuration';
import {SubSettingConfiguration} from './subsetting-configuration';

export class MatchAmountSubSettingConfiguration {
  constructor(init?: Partial<MatchAmountSubSettingConfiguration>) {
    Object.assign(this, init);
  }

  id?: number;
  accountingMode: string|null = null;
  toleranceGroupId?: number;
  billingMode: string|null = 'NONE';
  subSettingConfigurations: SubSettingConfiguration[] = [];
  matchOnlyExplicitResults = false;
  sortOrder: string|null = null;

  // tslint:disable-next-line:no-any
  [key: string]: any;
}