export class MatchAmountConfiguration {
  id?: number;
  accountingMode: string|null = null;
  toleranceGroupId?: number;
  billingMode: string|null = 'NONE';

  // tslint:disable-next-line:no-any
  [key: string]: any;
}