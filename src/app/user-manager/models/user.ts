import {Role} from './role';
import {Tenant} from './tenant';

export class User {
  id: string|undefined;
  firstName: string|undefined;
  lastName: string|undefined;
  email: string|undefined;
  passwordHash: string|undefined;
  passwordFailed = 0;
  locked = false;
  enabled = false;
  defaultTenant: number|undefined;
  tenantIds: number[] = [];
  roleIds: number[] = [];
  activated = false;
  initial = true;
}
