import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseService} from '../../shared/services/base.service';
import {FineFilter} from '../models/fine-filter';

@Injectable()
export class FineFilterService extends BaseService {
  private readonly baseUrl = '/backend/finefilters/api/v1/finefilters';

  getAll(): Observable<FineFilter[]> {
    return this.httpClient.get<FineFilter[]>(
        `${this.baseUrl}/${this.tenant}`, {observe: 'body'});
  }
}
