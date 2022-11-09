import {Tenant} from '../../user-manager/models/tenant';

export interface AuthToken {
  tenant: number;
  multitenant: boolean;
  sub: string; // userId
  name: string; //firstName
  userroles: number[];
  tenants: Tenant[];
}
