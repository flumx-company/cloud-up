import {HttpClient} from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BaseService} from '../../shared/services/base.service';
import {User} from '../models/user';
import {ActivateTenant} from '../models/activate-tenant';

@Injectable()
export class UserManagerService extends BaseService implements OnInit {
  private baseUrl = '/backend/usermanager/api/v1/users';

  ngOnInit(): void {}

  getAllForTenant(): Observable<User[]> {
    return this.httpClient.get<User[]>(
        `${this.baseUrl}/tenant/${this.tenant}`, {observe: 'body'});
  }

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}`, {observe: 'body'});
  }

  get(id: string): Observable<User> {
    return this.httpClient.get<User>(
        `${this.baseUrl}/${id}`, {observe: 'body'});
  }

  create(user: User): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl, user, {observe: 'body'});
  }

  delete(user: User): Observable<User> {
    return this.httpClient.delete<User>(
        `${this.baseUrl}/${user.id}`, {observe: 'body'});
  }

  update(userId: string, user: User): Observable<User> {
    return this.httpClient.put<User>(
        `${this.baseUrl}/${userId}`, user, {observe: 'body'});
  }

  activateTenant(tenant: ActivateTenant): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.baseUrl}/activateTenant`, tenant);
  }
}
