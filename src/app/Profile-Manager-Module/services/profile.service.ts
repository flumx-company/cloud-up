import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BaseService} from '../../shared/services/base.service';
import {EntityId, ProcessingProfile} from '../models';

@Injectable()
export class ProfileService extends BaseService {
  private readonly baseUrl = '/backend/profilemanager/api/v1/profile';

  readAllProfiles(): Observable<ProcessingProfile[]> {
    return this.httpClient.get<ProcessingProfile[]>(
        `${this.baseUrl}/${this.tenant}`, {observe: 'body'});
  }

  determineUsageOfProfiles(profileIds: EntityId[]): Observable<EntityId[]> {
    profileIds.forEach(id => id.tenant = this.tenant);
    return this.httpClient.post<EntityId[]>(
        `${this.baseUrl}/determineUsageOfProfiles`, profileIds,
        {observe: 'body'});
  }

  readProfile(name: string): Observable<ProcessingProfile[]> {
    return this.httpClient.get<ProcessingProfile[]>(
        `${this.baseUrl}/${this.tenant}?name=${encodeURIComponent(name)}`,
        {observe: 'body'});
  }

  saveProfile(profile: ProcessingProfile): Observable<ProcessingProfile> {
    profile.profileId.tenant = this.tenant;
    return this.httpClient.post<ProcessingProfile>(
        this.baseUrl, profile, {observe: 'body'});
  }

  updateProfile(profile: ProcessingProfile): Observable<ProcessingProfile> {
    profile.profileId.tenant = this.tenant;
    return this.httpClient.put<ProcessingProfile>(
        this.baseUrl, profile, {observe: 'body'});
  }

  deleteProfile(profileId: EntityId) {
    profileId.tenant = this.tenant;
    return this.httpClient.request(
        'delete', this.baseUrl, {body: profileId, observe: 'body'});
  }
}
