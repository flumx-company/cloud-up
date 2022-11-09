import {ListObject} from './list-object';

export class OpenItemField extends ListObject {
  constructor(init?: Partial<OpenItemField>) {
    super(init);
    Object.assign(this, init);
  }

  isDateField = false;
}