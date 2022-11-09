import {InsertMetaData} from '../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../shared/models/update-meta-data';
import {ExportReasonCode} from './export-reason-code';

export class AccountingSystem {
  id?: number;
  name?: string;
  tenant?: number;
  type: string;
  active?: boolean;
  keyField1: string;
  keyField1Value?: string;
  keyField2: string;
  keyField2Value?: string;
  keyField3?: string;
  keyField3Value?: string;
  keyField4?: string;
  keyField4Value?: string;
  keyField5?: string;
  keyField5Value?: string;
  insertMetadata = new InsertMetaData();
  updateMetadata = new UpdateMetaData();
  version?: string;
  exportReasonCodes: ExportReasonCode[] = [];

  constructor(init?: Partial<AccountingSystem>) {
    Object.assign(this, init);

    this.type = 'SAP';
    this.keyField1 = 'SYSTEM_ID';
    this.keyField2 = 'CLIENT_ID';
  }
}
