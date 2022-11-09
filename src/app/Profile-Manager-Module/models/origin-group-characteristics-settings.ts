import {ListObject} from '../../shared/models/list-object';

export class OriginGroupCharacteristicsSettings {
  static readonly list = [
    new ListObject({
      technicalName: 'ENRICH',
      displayName: 'Enrich',
      description: 'Enrich characteristics after each import'
    }),
    new ListObject({
      technicalName: 'INITIAL',
      displayName: 'Initial',
      description: 'Save characteristics only if no characteristics exist'
    }),
    new ListObject({
      technicalName: 'RESET',
      displayName: 'Reset',
      description: 'Always reset characteristics for each import'
    })
  ];
}
