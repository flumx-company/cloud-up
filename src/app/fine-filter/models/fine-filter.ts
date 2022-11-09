import {InsertMetaData} from '../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../shared/models/update-meta-data';

import {EntityId} from './entity-id';
import {ISASField} from './isas-field';
import {MatchField} from './match-field';
import {SearchExpression} from './search-expression';
import {ValidationFunctionConfiguration} from './validation-function-configuration';

export class FineFilter {
  constructor(init?: Partial<FineFilter>) {
    Object.assign(this, init);
  }

  filterId: EntityId|undefined;
  active: boolean|undefined;
  validationLowerLimit: string|undefined;
  validationUpperLimit: string|undefined;
  description: string|undefined;
  filterType: string|undefined;
  formatType: string|undefined;
  accountingSystemType: string|undefined;
  isasFields: ISASField[] = [];
  searchExpressions: SearchExpression[] = [];
  validationFunctionConfigurations: ValidationFunctionConfiguration[] = [];
  matchFields: MatchField[] = [];
  insertMetadata: InsertMetaData = new InsertMetaData();
  updateMetadata: UpdateMetaData = new UpdateMetaData();
  version: string|undefined;
  // tslint:disable-next-line:no-any
  [key: string]: any;
}
