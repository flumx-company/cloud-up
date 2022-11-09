import {InsertMetaData} from '../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../shared/models/update-meta-data';

export class RestrictionPart {
  constructor(init?: Partial<RestrictionPart>) {
    Object.assign(this, init);
  }

  index: number|undefined;
  startingBraces: number|undefined;
  restriction: string|undefined;
  matchFieldISAS: string|undefined;
  matchTableISAS: string|undefined;
  operator: string|undefined;
  minValue: string|undefined;
  maxValue: string|undefined;
  matchFieldOI: string|undefined;
  filterMinValue: string|undefined;
  filterMaxValue: string|undefined;
  endingBraces: number|undefined;
  operation: string|undefined;
  insertMetadata: InsertMetaData = new InsertMetaData();
  updateMetadata: UpdateMetaData = new UpdateMetaData();
  version: string|undefined;
}
