import {InsertMetaData} from '../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../shared/models/update-meta-data';

import {BankStatementAmount} from './bank-statement-amount';
import {BankStatementNTP} from './bank-statement-ntp';
import {StmtToRemAdv} from './stmt-to-remadv';

export class BankStatementPosition {
  constructor(init?: Partial<BankStatementPosition>) {
    Object.assign(this, init);
  }

  entityId?: number;
  BANK_POSTDATE: string|undefined;
  DOC_POSTDATE: string|undefined;
  VALUE_DATE: string|undefined;
  PAYM_CURR: string|undefined;
  CDTDBT_INDICATOR: string|undefined;
  PAYM_AMOUNT: string|undefined;
  EXT_BUSINESS_TA: string|undefined;
  TEXTKEY: string|undefined;
  BANK_POSTINGTXT: string|undefined;
  PA_BANKCOUNTRYCODE: string|undefined;
  PA_BANKCODENO: string|undefined;
  PA_BIC: string|undefined;
  PA_BANKACCTNO: string|undefined;
  PA_NAME: string|undefined;
  PA_IBAN: string|undefined;
  DAYBOOKNO: string|undefined;
  CHECKNO: string|undefined;
  AVISID: string|undefined;
  BANK_REFERENCE: string|undefined;
  PAYM_REFERENCE: string|undefined;
  C2C_REFERENCE: string|undefined;
  C2C_REFERENCE2: string|undefined;
  C2C_KREF: string|undefined;
  C2C_MREF: string|undefined;
  BANKSTMT_AMOUNT: BankStatementAmount[]|undefined;
  BANKSTMT_NTP: BankStatementNTP[]|undefined;
  bankStatementPositionRemittanceAdviceHeaders: StmtToRemAdv[]|undefined;
  insertMetadata: InsertMetaData = new InsertMetaData();
  updateMetadata: UpdateMetaData = new UpdateMetaData();
  version: string|undefined;
}
