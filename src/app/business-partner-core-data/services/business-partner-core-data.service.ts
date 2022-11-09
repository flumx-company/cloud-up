import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {AuthService} from '../../shared/services/auth.service';
import {BaseService} from '../../shared/services/base.service';
import {BusinessPartner} from '../models/business-partner';

@Injectable()
export class BusinessPartnerCoreDataService extends BaseService {
  private readonly baseUrl: string =
      '/backend/businesspartner/api/v1/businesspartner';

  getById(id: string): Observable<BusinessPartner> {
    return this.httpClient.get<BusinessPartner>(
        `${this.baseUrl}/select/${this.tenant}/${id}`, {observe: 'body'});
  }

  getAll(): Observable<BusinessPartner[]> {
    return this.httpClient.get<BusinessPartner[]>(
        `${this.baseUrl}/select/${this.tenant}`, {observe: 'body'});
  }

  insert(partner: BusinessPartner): Observable<BusinessPartner> {
    partner.tenant = this.tenant;
    return this.httpClient.post<BusinessPartner>(
        `${this.baseUrl}/insert`, partner);
  }

  update(partner: BusinessPartner): Observable<BusinessPartner> {
    partner.tenant = this.tenant;
    return this.httpClient.put<BusinessPartner>(
        `${this.baseUrl}/update`, partner);
  }

  // tslint:disable-next-line:no-any
  delete(id: string): Observable<HttpResponse<any>> {
    return this.httpClient.delete(
        `${this.baseUrl}/delete/${this.tenant}/${id}`, {observe: 'response'});
  }

  isDuplicate(businessPartner: BusinessPartner): Observable<boolean> {
    return this.httpClient.post<boolean>(
        `${this.baseUrl}/isDuplicate`, businessPartner);
  }
}
