import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {BaseService} from '../../shared/services/base.service';
import {FineFilter} from '../models/fine-filter';

@Injectable()
export class FineFilterService extends BaseService {
  private baseUrl = '/backend/finefilters/api/v1/finefilters';

  getFilterForTenant(): Observable<FineFilter[]> {
    return this.httpClient.get<FineFilter[]>(`${this.baseUrl}/${this.tenant}`);
  }
}
