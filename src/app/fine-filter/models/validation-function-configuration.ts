import {InsertMetaData} from '../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../shared/models/update-meta-data';

export class ValidationFunctionConfiguration {
  constructor(init?: Partial<ValidationFunctionConfiguration>) {
    Object.assign(this, init);
  }

  id: number|undefined;
  index: number|undefined;
  validationFunction: string|undefined;
  validationType: string|undefined;
  insertMetadata: InsertMetaData = new InsertMetaData();
  updateMetadata: UpdateMetaData = new UpdateMetaData();
  version: string|undefined;
  // tslint:disable-next-line:no-any
  [key: string]: any;
}
