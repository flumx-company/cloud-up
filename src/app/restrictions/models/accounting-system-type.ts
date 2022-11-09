export class AccountingSystemType {
  constructor(init?: Partial<AccountingSystemType>) {
    Object.assign(this, init);
  }

  technicalName = '';
  displayName = '';
}
