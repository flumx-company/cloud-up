import {ListObject} from '../../shared/models/list-object';

export class FineFilterTypeList {
  static readonly list = [
    new ListObject({technicalName: 'MATCHING', displayName: 'Matching'}),
    // new ListObject({technicalName: 'EXTRACTION', displayName: 'Extraction'}),
    new ListObject(
        {technicalName: 'BUSINESSPARTNER', displayName: 'Business Partner'}),
    new ListObject({
      technicalName: 'REMITTANCE_ADVICE',
      displayName: 'Remittance Advice'
    })
  ];
}
