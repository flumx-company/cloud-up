export class AccountingSystem {
  constructor(init?: Partial<AccountingSystem>) {
    Object.assign(this, init);
  }

  id: number | undefined;
  name = '';
  tenant: number | undefined;
}
