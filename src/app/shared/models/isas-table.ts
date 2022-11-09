import {ListObject} from './list-object';

export class ISASTable extends ListObject {
  constructor(init?: Partial<ISASTable>) {
    super(init);
    Object.assign(this, init);
  }

  isasFields: ListObject[] = [];
  type = 'ALL';
}