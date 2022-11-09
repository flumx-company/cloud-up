import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {BaseService} from '../../shared/services/base.service';
import {ToleranceGroup} from '../models/tolerance-group';

@Injectable()
export class ToleranceGroupService extends BaseService {
  private baseUrl = '/backend/toleranceGroup/api/v1/toleranceGroup';

  readAll(): Observable<ToleranceGroup[]> {
    return this.httpClient.get<ToleranceGroup[]>(
        `${this.baseUrl}/selectAll/${this.tenant}`);
  }
}
