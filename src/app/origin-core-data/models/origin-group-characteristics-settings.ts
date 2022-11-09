import {EnumClass} from './enum-class';

export class OriginGroupCharacteristicsSettings {
  static readonly list = [
    new EnumClass({
      technicalName: 'ENRICH',
      displayName: 'Enrich',
      description: 'Enrich characteristics after each import'
    }),
    new EnumClass({
      technicalName: 'INITIAL',
      displayName: 'Initial',
      description: 'Save characteristics only if no characteristics exist'
    }),
    new EnumClass({
      technicalName: 'RESET',
      displayName: 'Reset',
      description: 'Always reset characteristics for each import'
    })
  ];
}
