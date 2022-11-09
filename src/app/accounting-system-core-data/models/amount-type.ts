export class AmountType {
  constructor(init?: Partial<AmountType>) {
    Object.assign(this, init);
  }

  amountTypeIdentifier?: string;
  amountTypeClass?: string;
  predefinedType?: boolean;
}