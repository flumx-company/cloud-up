import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BaseService} from '../../shared/services/base.service';
import {Restriction} from '../models/restriction';

@Injectable()
export class RestrictionService extends BaseService {
  private baseUrl = '/backend/restrictions/api/v1/restrictions';

  saveRestriction(restriction: Restriction): Observable<Restriction> {
    restriction.entityId.tenant = this.tenant;
    return this.httpClient.post<Restriction>(
        this.baseUrl, restriction, {observe: 'body'});
  }

  updateRestriction(restriction: Restriction): Observable<Restriction> {
    restriction.entityId.tenant = this.tenant;
    return this.httpClient.put<Restriction>(
        this.baseUrl, restriction, {observe: 'body'});
  }

  deleteRestriction(restriction: Restriction) {
    restriction.entityId.tenant = this.tenant;
    return this.httpClient.request(
        'delete', this.baseUrl, {body: restriction.entityId, observe: 'body'});
  }

  readAllRestrictions(): Observable<Restriction[]> {
    return this.httpClient.get<Restriction[]>(
        `${this.baseUrl}/${this.tenant}`, {observe: 'body'});
  }
}
