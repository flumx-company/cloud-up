import {isNullOrUndefined} from 'util';

export class ListObject {
  constructor(init?: Partial<ListObject>) {
    Object.assign(this, init);
  }

  technicalName = '';
  displayName = '';
  description = '';

  static getDisplayName(technicalName: string, list: ListObject[]): string {
    if (isNullOrUndefined(technicalName)) {
      return '';
    }

    const listObject = list.find(type => type.technicalName === technicalName);

    if (!listObject) {
      return technicalName;
    }

    return listObject.displayName;
  }
}
