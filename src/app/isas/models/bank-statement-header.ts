import {InsertMetaData} from '../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../shared/models/update-meta-data';

import {BankStatementPosition} from './bank-statement-position';

export class BankStatementHeader {
  constructor(init?: Partial<BankStatementHeader>) {
    Object.assign(this, init);
  }

  entityId?: number;
  ID?: string;
  ACCT_TYPE?: string;
  BANK_BIC?: string;
  BANK_IBAN?: string;
  BANK_BCNO?: string;
  BANK_BANO?: string;
  SEQNO?: string;
  CREATE_DATE?: string;
  CREATE_TIME?: string;
  ACCT_CURR?: string;
  BANKSTMT_POSITION: BankStatementPosition[] = [];
  insertMetadata: InsertMetaData = new InsertMetaData();
  updateMetadata: UpdateMetaData = new UpdateMetaData();
  version?: string;
}
