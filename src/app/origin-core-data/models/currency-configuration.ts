import {InsertMetaData} from './insert-meta-data';
import {UpdateMetaData} from './update-meta-data';

export class CurrencyConfiguration {
  constructor(init?: Partial<CurrencyConfiguration>) {
    Object.assign(this, init);
  }

  id?: number;
  tenant: number;
  originId?: string;
  originGroupId?: string;
  amountType: string;
  regexPrefix?: string;
  regexCurrency?: string;
  regexExchangeRate?: string;
  insertMetadata = new InsertMetaData();
  updateMetadata = new UpdateMetaData();
  version?: string;
}
