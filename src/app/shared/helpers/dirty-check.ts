import {isNullOrUndefined} from 'util';

export class DirtyCheck {
  static isDirty(object1: object|string, object2: object|string): boolean {
    return this.getStringFromStringOrObject(object1) !==
        this.getStringFromStringOrObject(object2);
  }

  static getStringFromStringOrObject(object: object|string): string {
    return (typeof object === typeof 'string') ?
        object as string :
        JSON.stringify(
            object, (key, value) => isNullOrUndefined(value) ? '' : value);
  }
}
