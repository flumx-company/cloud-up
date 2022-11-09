import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '../../shared/services/base.service';
import {User} from '../models/user';

@Injectable()
export class RegistrationService {
  baseUrl = '/backend/registration/api/v1/registration';

  constructor(private httpClient: HttpClient) {}

  resetUserPassword(user: User) {
    return this.httpClient.post<User>(`${this.baseUrl}/resendRegistrationLink`, user, {observe: 'response'});
  }
}
