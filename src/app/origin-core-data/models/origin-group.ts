import {Characteristic} from './characteristic';
import {CurrencyConfiguration} from './currency-configuration';
import {EntityId} from './entity-id';
import {EnumClass} from './enum-class';
import {ImportReasonCode} from './import-reason-code';
import {InsertMetaData} from './insert-meta-data';
import {OptimizationConfiguration} from './optimization-configuration';
import {UpdateMetaData} from './update-meta-data';

export class OriginGroup {
  constructor(init?: Partial<OriginGroup>) {
    Object.assign(this, init);
  }

  id = new EntityId();
  active: boolean|undefined;
  description: string|undefined;
  fieldIdentificationSetting: string|undefined;
  optimizationSetting: string|undefined;
  sequenceClatchProcess: string|undefined;
  characteristicsSetting: EnumClass|undefined;
  insertMetadata: InsertMetaData|undefined;
  updateMetadata: UpdateMetaData|undefined;
  characteristics: Characteristic[] = [];
  foreignCurrencyConfigurations: CurrencyConfiguration[] = [];
  importReasonCodes: ImportReasonCode[] = [];
  optimizationConfigurations: OptimizationConfiguration[] = [];
}
