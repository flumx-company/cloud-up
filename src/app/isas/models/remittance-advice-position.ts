import {InsertMetaData} from '../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../shared/models/update-meta-data';

import {RemittanceAdviceAmount} from './remittance-advice-amount';
import {RemittanceAdviceUnstructuredLine} from './remittance-advice-unstructured-line';

export class RemittanceAdvicePosition {
  constructor(init?: Partial<RemittanceAdvicePosition>) {
    Object.assign(this, init);
  }

  entityId?: number;
  INVOICE_REF_1: string|undefined;
  INVOICE_REF_2: string|undefined;
  INVOICE_REF_3: string|undefined;
  INVOICE_REF_4: string|undefined;
  INVOICE_REF_5: string|undefined;
  INVOICE_REF_6: string|undefined;
  INVOICE_REF_7: string|undefined;
  INVOICE_DATE: string|undefined;
  PAYM_CURR: string|undefined;
  CDTDBT_INDICATOR: string|undefined;
  PAYM_AMOUNT: string|undefined;
  REMADV_AMOUNT: RemittanceAdviceAmount[]|undefined;
  REMADV_UNSTRUCTLINE: RemittanceAdviceUnstructuredLine[]|undefined;
  insertMetadata: InsertMetaData = new InsertMetaData();
  updateMetadata: UpdateMetaData = new UpdateMetaData();
  version: string|undefined;
  createdBy?: string;
}
