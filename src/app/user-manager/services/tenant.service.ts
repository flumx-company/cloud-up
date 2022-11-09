import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Tenant} from '../models/tenant';

@Injectable()
export class TenantService {
  private baseUrl = '/backend/tenant/api/v1/tenants';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Tenant[]> {
    return this.httpClient.get<Tenant[]>(`${this.baseUrl}/selectAll`, {observe: 'body'});
  }
}
