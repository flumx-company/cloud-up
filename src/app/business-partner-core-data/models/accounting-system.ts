export class AccountingSystem {
  constructor(init?: Partial<AccountingSystem>) {
    Object.assign(this, init);
  }

  id: number|undefined;
  name: string|undefined;
  tenant: number|undefined;
}
