import {InsertMetaData} from '../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../shared/models/update-meta-data';

export class PaymentDifference {
  constructor(init?: Partial<PaymentDifference>) {
    Object.assign(this, init);
  }

  paymentDifferenceId?: number;
  currency?: string;
  yieldAmount?: number;
  yieldPercent?: number;
  expensesAmount?: number;
  expensesPercent?: number;
  uuid?: string;
  insertMetadata?: InsertMetaData;
  updateMetadata?: UpdateMetaData;
  version?: string;
}
