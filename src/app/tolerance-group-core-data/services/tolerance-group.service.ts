import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {BaseService} from '../../shared/services/base.service';
import {ToleranceGroup} from '../models/tolerance-group';

@Injectable()
export class ToleranceGroupService extends BaseService {
  private baseUrl = '/backend/toleranceGroup/api/v1/toleranceGroup';

  createToleranceGroup(toleranceGroup: ToleranceGroup):
      Observable<ToleranceGroup> {
    toleranceGroup.tenant = this.tenant;
    return this.httpClient.post<ToleranceGroup>(
        `${this.baseUrl}/insert`, toleranceGroup, {observe: 'body'});
  }


  readAll(): Observable<ToleranceGroup[]> {
    return this.httpClient.get<ToleranceGroup[]>(
        `${this.baseUrl}/selectAll/${this.tenant}`, {observe: 'body'});
  }


  updateToleranceGroup(toleranceGroup: ToleranceGroup):
      Observable<ToleranceGroup> {
    toleranceGroup.tenant = this.tenant;
    return this.httpClient.put<ToleranceGroup>(
        `${this.baseUrl}/update`, toleranceGroup, {observe: 'body'});
  }

  // tslint:disable-next-line:no-any
  deleteToleranceGroup(toleranceGroup: ToleranceGroup):
      Observable<ToleranceGroup> {
    toleranceGroup.tenant = this.tenant;
    return this.httpClient.request<ToleranceGroup>(
        'delete', `${this.baseUrl}`, {body: toleranceGroup, observe: 'body'});
  }

  getToleranceGroupByName(name: string): Observable<ToleranceGroup> {
    return this.httpClient.get<ToleranceGroup>(
        `${this.baseUrl}/selectAllByName/${this.tenant}/${name}`,
        {observe: 'body'});
  }
}
