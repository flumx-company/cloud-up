import {InsertMetaData} from '../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../shared/models/update-meta-data';

import {Characteristic} from './characteristic';
import {CurrencyConfiguration} from './currency-configuration';
import {EntityId} from './entity-id';
import {ImportReasonCode} from './import-reason-code';
import {OptimizationConfiguration} from './optimization-configuration';

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
  bankCountry: string|undefined;
  bankId: string|undefined;
  accountId: string|undefined;
  bic: string|undefined;
  iban: string|undefined;
  sequenceClatchProcess: string|undefined;
  fieldIdentificationSetting: string|undefined;
  optimizationSetting: string|undefined;
  accountingSystem: number|undefined;
  originGroupId: string|undefined|null;
  characteristicsSetting: string|undefined;
  insertMetadata: InsertMetaData|undefined;
  updateMetadata: UpdateMetaData|undefined;
  characteristics: Characteristic[] = [];
  foreignCurrencyConfigurations: CurrencyConfiguration[] = [];
  importReasonCodes: ImportReasonCode[] = [];
  optimizationConfigurations: OptimizationConfiguration[] = [];
}
