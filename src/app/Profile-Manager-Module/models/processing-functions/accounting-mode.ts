import {ListObject} from '../../../shared/models/list-object';

export class AccountingMode {
  static readonly list = [
    new ListObject({displayName: 'Post on hit', technicalName: 'HIT_BOOKING'}),
    new ListObject({
      displayName: 'Do not post on hit -> Cancel Function',
      technicalName: 'HIT_DO_NOT_BOOK_ABORT_FUNCTION'
    }),
    new ListObject({
      displayName: 'Do not post on hit -> Cancel Profile',
      technicalName: 'HIT_DO_NOT_BOOK_ABORT_PROFILE'
    }),
    new ListObject({
      displayName: 'Do not post on hit -> Cancel Profile Sequence',
      technicalName: 'HIT_DO_NOT_BOOK_ABORT_SEQUENCE'
    }),
    new ListObject({
      displayName: 'Results can not be booked -> Cancel Profile',
      technicalName: 'HIT_NOT_BOOKABLE_ABORT_PROFILE'
    }),
    new ListObject({
      displayName: 'Results can not be booked -> Cancel Profile Sequence',
      technicalName: 'HIT_NOT_BOOKABLE_ABORT_SEQUENCE'
    })
  ];
}