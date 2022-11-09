
import {InsertMetaData} from '../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../shared/models/update-meta-data';
import {PaymentDifference} from './payment-difference';

export class ToleranceGroup {
  constructor(init?: Partial<ToleranceGroup>) {
    Object.assign(this, init);
  }

  tenant: number|undefined;
  toleranceGroupId: number|undefined;
  name: string|undefined;
  description?: string;
  active?: boolean;
  toleranceDays?: number;
  paymentDifferences: PaymentDifference[] = [];
  insertMetadata?: InsertMetaData;
  updateMetadata?: UpdateMetaData;
  version?: string;
}