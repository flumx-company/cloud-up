import {ListObject} from '../../shared/models/list-object';

export class OptimizationSearchModeList {
  static readonly list = [
    new ListObject(
        {technicalName: 'VALUE', displayName: 'Search a specific value'}),
    new ListObject(
        {technicalName: 'ENUMERATION', displayName: 'Search an enumeration'}),
    new ListObject(
        {technicalName: 'INTERVAL', displayName: 'Search an interval'})
  ];
}
