import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Role} from '../models/role';

@Injectable()
export class RoleService {
  private baseUrl = '/backend/usermanager/api/v1/roles';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(`${this.baseUrl}/`, {observe: 'body'});
  }
}
