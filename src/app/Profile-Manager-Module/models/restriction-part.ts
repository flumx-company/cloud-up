import {InsertMetaData} from '../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../shared/models/update-meta-data';

export class RestrictionPart {
  constructor(init?: Partial<RestrictionPart>) {
    Object.assign(this, init);
  }

  index = 0;
  startingBraces = 0;
  restriction = '';
  matchFieldISAS = '';
  matchTableISAS = '';
  operator: string|undefined|null;
  minValue = '';
  maxValue = '';
  matchFieldOI = '';
  filterMinValue = '';
  filterMaxValue = '';
  endingBraces = 0;
  operation: string|undefined|null;
  insertMetadata: InsertMetaData = new InsertMetaData();
  updateMetadata: UpdateMetaData = new UpdateMetaData();
  version: string|undefined|null;
  // tslint:disable-next-line:no-any
  [key: string]: any;
}
