export class UsageInfoFilter {
  constructor(init?: Partial<UsageInfoFilter>) {
    Object.assign(this, init);
  }

  usageInfo: Map<string, boolean>|undefined;
  usageInfoMap: Map<string, boolean>|undefined;
}
