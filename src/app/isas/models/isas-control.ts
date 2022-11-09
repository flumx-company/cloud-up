import {BankStatementHeader} from './bank-statement-header';

export class IsasControl {
  constructor(init?: Partial<IsasControl>) {
    Object.assign(this, init);
  }

  entityId = 0;
  tenant = 0;
  origin?: string;
  originGroup?: string;
  formatType?: string;
  status?: string;
  formatOrigin?: string;
  bankStatementHeader?: BankStatementHeader;
}
