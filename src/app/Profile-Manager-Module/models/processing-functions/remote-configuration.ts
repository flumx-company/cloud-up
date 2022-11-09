export class RemoteConfiguration {
  id?: number;
  tenant?: number;
  accountingSystemId?: number;
  restrictionName?: string;
  filterType: string|null = null;
  filterName?: string;
  // tslint:disable-next-line:no-any
  [key: string]: any;
}