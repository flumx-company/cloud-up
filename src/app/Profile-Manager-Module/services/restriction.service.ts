import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {BaseService} from '../../shared/services/base.service';
import {Restriction} from '../models';

@Injectable()
export class RestrictionService extends BaseService {
  private baseUrl = '/backend/restrictions/api/v1/restrictions';

  readAllRestrictions(): Observable<Restriction[]> {
    return this.httpClient.get<Restriction[]>(`${this.baseUrl}/${this.tenant}`);
  }
}
