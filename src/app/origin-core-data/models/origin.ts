import {Characteristic} from './characteristic';
import {CurrencyConfiguration} from './currency-configuration';
import {EntityId} from './entity-id';
import {EnumClass} from './enum-class';
import {ImportReasonCode} from './import-reason-code';
import {InsertMetaData} from './insert-meta-data';
import {OptimizationConfiguration} from './optimization-configuration';
import {UpdateMetaData} from './update-meta-data';

export class Origin {
  constructor(init?: Partial<Origin>) {
    Object.assign(this, init);
  }

  id = new EntityId();
  description: string|undefined;
  active: boolean|undefined;
  format: string|undefined;
  formatType: string|undefined;
  currency: string|undefined;
  documentCurrency: string|undefined;
  bankCountry: string|undefined;
  bankId: string|undefined;
  accountId: string|undefined;
  bic: string|undefined;
  iban: string|undefined;
  ilnSender: string|undefined;
  ilnConsignee: string|undefined;
  emailSender: string|undefined;
  emailConsignee: string|undefined;
  emailRecordType102: string|undefined;
  taxNumber: string|undefined;
  customerId: string|undefined;
  sequenceClatchProcess: string|undefined;
  fieldIdentificationSetting: string|undefined;
  optimizationSetting: string|undefined;
  accountingSystem: number|undefined;
  originGroupId: string|undefined|null;
  characteristicsSetting: EnumClass|undefined;
  insertMetadata: InsertMetaData|undefined;
  updateMetadata: UpdateMetaData|undefined;
  characteristics: Characteristic[] = [];
  foreignCurrencyConfigurations: CurrencyConfiguration[] = [];
  importReasonCodes: ImportReasonCode[] = [];
  optimizationConfigurations: OptimizationConfiguration[] = [];
}
