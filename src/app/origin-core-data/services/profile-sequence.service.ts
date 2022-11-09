import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BaseService} from '../../shared/services/base.service';
import {ProcessingProfileSequence} from '../models/processing-profile-sequence';

@Injectable()
export class ProfileSequenceService extends BaseService {
  private baseUrl = '/backend/profilemanager/api/v1/profilesequence';


  readAllSequences(): Observable<ProcessingProfileSequence[]> {
    return this.httpClient.get<ProcessingProfileSequence[]>(
        `${this.baseUrl}/${this.tenant}`, {observe: 'body'});
  }
}
