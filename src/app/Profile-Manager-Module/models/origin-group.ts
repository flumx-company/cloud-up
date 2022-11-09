import {InsertMetaData} from '../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../shared/models/update-meta-data';

import {Characteristic} from './characteristic';
import {CurrencyConfiguration} from './currency-configuration';
import {EntityId} from './entity-id';
import {ImportReasonCode} from './import-reason-code';
import {OptimizationConfiguration} from './optimization-configuration';

export class OriginGroup {
  constructor(init?: Partial<OriginGroup>) {
    Object.assign(this, init);
  }

  id = new EntityId();
  active = false;
  description = '';
  fieldIdentificationSetting = '';
  optimizationSetting = '';
  sequenceClatchProcess = '';
  characteristicsSetting?: string;
  insertMetadata: InsertMetaData = new InsertMetaData();
  updateMetadata: UpdateMetaData = new UpdateMetaData();
  version: string|undefined|null;
  characteristics: Characteristic[] = [];
  foreignCurrencyConfigurations: CurrencyConfiguration[] = [];
  importReasonCodes: ImportReasonCode[] = [];
  optimizationConfigurations: OptimizationConfiguration[] = [];
}
