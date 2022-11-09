import {InsertMetaData} from '../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../shared/models/update-meta-data';

export class BusinessPartner {
  constructor(init?: Partial<BusinessPartner>) {
    Object.assign(this, init);
  }

  businessPartnerId: number|undefined;
  tenant: number|undefined;
  accountingSystem: string|undefined;
  bankAccount: string|undefined;
  bankCode: string|undefined;
  bankCountry: string|undefined;
  businessPartner: string|undefined;
  iban: string|undefined;
  matchField: string|undefined;
  matchValue: string|undefined;
  accountType: string|undefined;

  insertMetadata: InsertMetaData|undefined;
  updateMetadata: UpdateMetaData|undefined;
  version: string|undefined;
}
