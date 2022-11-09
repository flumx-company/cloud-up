export class SearchValues {
  constructor(init?: Partial<SearchValues>) {
    Object.assign(this, init);
  }

  companyIds: string[] = [];
  accountTypes: string[] = [];
  accounts: string[] = [];
}
