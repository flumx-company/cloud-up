import {ListObject} from '../../../shared/models/list-object';

export class BillingMode {
  static readonly list = [
    new ListObject({displayName: 'None', technicalName: 'NONE'}),
    new ListObject({
      displayName: 'With exactly one credit note',
      technicalName: 'ONLY_ONE_CREDIT'
    }),
    new ListObject({
      displayName: 'With all credit notes',
      technicalName: 'WITH_ALL_CREDITS'
    }),
    new ListObject({
      displayName:
          'With all credit notes initially, then with exactly one credit note',
      technicalName: 'FIRST_WITH_ALL_CREDITS_THEN_WITH_EACH_CREDIT'
    }),
  ];
}