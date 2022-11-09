import {RemittanceAdviceHeader} from './remittance-advice-header';

export class StmtToRemAdv {
  constructor(init?: Partial<StmtToRemAdv>) {
    Object.assign(this, init);
  }

  entityId?: number;
  remittanceAdviceHeader: RemittanceAdviceHeader|undefined;
}
