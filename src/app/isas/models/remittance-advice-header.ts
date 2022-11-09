import {InsertMetaData} from '../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../shared/models/update-meta-data';

import {RemittanceAdviceAmount} from './remittance-advice-amount';
import {RemittanceAdvicePosition} from './remittance-advice-position';

export class RemittanceAdviceHeader {
  constructor(init?: Partial<RemittanceAdviceHeader>) {
    Object.assign(this, init);
  }

  entityId?: number;
  formatType?: string;
  linkedToBankStatement?: boolean;
  REMADV_ID: string|undefined;
  REMADV_IDEXT: string|undefined;
  PAYER: string|undefined;
  ALTERNATE_PAYER: string|undefined;
  REMADV_SENDER: string|undefined;
  REMADV_RECEIVER: string|undefined;
  SETTLM_DATE: string|undefined;
  REMADV_REF_1: string|undefined;
  REMADV_REF_2: string|undefined;
  REMADV_REF_3: string|undefined;
  REMADV_REF_4: string|undefined;
  REMADV_REF_5: string|undefined;
  REMADV_REF_6: string|undefined;
  REMADV_REF_7: string|undefined;
  PAYM_CURR: string|undefined;
  CDTDBT_INDICATOR: string|undefined;
  PAYM_AMOUNT: string|undefined;
  ARC_ID: string|undefined;
  EMAIL_SENDER: string|undefined;
  EMAIL_SENDER_AVS: string|undefined;
  EMAIL_RECEIVER: string|undefined;
  PAYM_DATE: string|undefined;
  EMAIL_SUBJECT: string|undefined;
  FILENAME: string|undefined;
  CREATE_DATE: string|undefined;
  CREATE_TIME: string|undefined;
  CUST_ACCOUNT: string|undefined;
  NAME1_SENDER: string|undefined;
  NAME2_SENDER: string|undefined;
  STREET_SENDER: string|undefined;
  CITY_SENDER: string|undefined;
  POSTCODE_SENDER: string|undefined;
  POBOX_SENDER: string|undefined;
  TELNO_SENDER: string|undefined;
  FAX_SENDER: string|undefined;
  TAXNO_SENDER: string|undefined;
  SALESTAXNO_SENDER: string|undefined;
  TRADEREGISTERNO_SENDER: string|undefined;
  BANK_BIC: string|undefined;
  BANK_IBAN: string|undefined;
  BANK_BCNO: string|undefined;
  BANK_BANO: string|undefined;
  ACCOUNT_HOLDER: string|undefined;
  REMADV_POSITION: RemittanceAdvicePosition[]|undefined;
  REMADV_AMOUNT: RemittanceAdviceAmount[]|undefined;
  insertMetadata: InsertMetaData = new InsertMetaData();
  updateMetadata: UpdateMetaData = new UpdateMetaData();
  version: string|undefined;
}
