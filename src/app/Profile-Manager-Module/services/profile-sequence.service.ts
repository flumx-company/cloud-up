import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BaseService} from '../../shared/services/base.service';
import {EntityId, ProcessingProfileSequence} from '../models';

@Injectable()
export class ProfileSequenceService extends BaseService {
  private baseUrl = '/backend/profilemanager/api/v1/profilesequence';


  readAllSequences(): Observable<ProcessingProfileSequence[]> {
    return this.httpClient.get<ProcessingProfileSequence[]>(
        `${this.baseUrl}/${this.tenant}`, {observe: 'body'});
  }

  readSequencesWithProfile(profileId: EntityId):
      Observable<ProcessingProfileSequence[]> {
    profileId.tenant = this.tenant;
    return this.httpClient.get<ProcessingProfileSequence[]>(
        `${this.baseUrl}/${profileId.tenant}/${
            encodeURIComponent(profileId.name)}`,
        {observe: 'body'});
  }

  // tslint:disable-next-line:no-any
  isProfileUsedInSequence(profileId: EntityId): Observable<HttpResponse<any>> {
    profileId.tenant = this.tenant;
    // tslint:disable-next-line:no-any
    return this.httpClient.post<HttpResponse<any>>(
        `${this.baseUrl}/isProfileUsed`, profileId, {observe: 'response'});
  }

  readSequence(name: string): Observable<ProcessingProfileSequence[]> {
    return this.httpClient.get<ProcessingProfileSequence[]>(
        `${this.baseUrl}/${this.tenant}?name=${encodeURIComponent(name)}`,
        {observe: 'body'});
  }

  saveSequence(sequence: ProcessingProfileSequence):
      Observable<ProcessingProfileSequence> {
    sequence.sequenceId.tenant = this.tenant;
    return this.httpClient.post<ProcessingProfileSequence>(
        this.baseUrl, sequence, {observe: 'body'});
  }

  updateSequence(sequence: ProcessingProfileSequence):
      Observable<ProcessingProfileSequence> {
    sequence.sequenceId.tenant = this.tenant;
    return this.httpClient.put<ProcessingProfileSequence>(
        this.baseUrl, sequence, {observe: 'body'});
  }

  deleteSequence(sequence: ProcessingProfileSequence) {
    sequence.sequenceId.tenant = this.tenant;
    return this.httpClient.request(
        'delete', this.baseUrl, {body: sequence.sequenceId, observe: 'body'});
  }

  readAllSequenceIds(): Observable<EntityId[]> {
    return this.httpClient.get<EntityId[]>(
        `${this.baseUrl}/onlyIds/${this.tenant}`);
  }
}
