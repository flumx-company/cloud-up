import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BaseService} from '../../shared/services/base.service';
import {IsasControl} from '../models/isas-control';
import {ISASPage} from '../models/isas-page';
import {AuthService} from "../../shared/services/auth.service";

@Injectable()
export class IsasService {
  private isasBaseUrl = '/backend/ISAS_Service/api/v1/isas';
  protected tenant: number;

  dataListReasonsCodes: any = [
    {
      type: 'dNV_ATM',
      Amount:'INVOICEVALUE',
      Pred: true,
      key: 'entityId',
      description: 'INVOICEVALUE'
    },{
      type: 'INV_ATM',
      key: 'entityId',
      Amount:'INVOICEVALUE',
      Pred: true,
      description: 'INVOICEVALUE'
    },{
      type: 'INV_ATM',
      Amount:'INVOICEVALUE',
      Pred: true,
      key: 'entityId',
      description: 'INVOICEVALUE'
    },{
      type: 'INV_ATM',
      Amount:'INVOICEVALUE',
      Pred: true,
      description: 'INVOICEVALUE',
      key: 'entityId'
    },{
      type: 'INV_ATM',
      Amount:'INVOICEVALUE',
      Pred: true,
      description: 'INVOICEVALUE',
      key: 'entityId'
    },{
      type: 'INV_ATM',
      Amount:'INVOICEVALUE',
      Pred: true,
      description: 'INVOICEVALUE',
      key: 'entityId'
    },{
      type: 'INV_ATM',
      Amount:'INVOICEVALUE',
      Pred: true,
      key: 'entityId',
      description: 'lNVOICEVALUE',
    },
  ];

  constructor(
      protected httpClient: HttpClient, protected authService: AuthService) {
    try {
      this.tenant = Number(this.authService.getTenant());
    } catch (error) {
      console.log(error);
    }
  }

    getISASForTenant(formatType?: string, skip?: number, take?: number):
        Observable<ISASPage> {
        let params = this.getPagingParams(skip, take);

    if (formatType) {
      params = new HttpParams()
          .set('page', params.get('page')!)
          .set('size', params.get('size')!)
          .set('formatType', formatType);
    }

    return this.httpClient.get<ISASPage>(
        `https://dev-auth-api.azurewebsites.net${this.isasBaseUrl}/${this.tenant}`, {observe: 'body', params});
  }

  getDataReasonCodes(){
    return new Promise((resolve, reject) => {
      resolve(this.dataListReasonsCodes)
    })
  }

    getISASById(id: number) {
        return this.httpClient.get<IsasControl>(
            `${this.isasBaseUrl}/id/${id}`, {observe: 'body'});
    }

    getISASByRemittanceAdviceEntityId(id: number) {
        return this.httpClient.get<IsasControl>(
            `${this.isasBaseUrl}/getISASByRemittanceAdviceEntityId/${this.tenant}/${
                id}`,
            {observe: 'body'});
    }

    getLinkedBankStatements(
        remittanceAdviceId: number, skip?: number,
        take?: number): Observable<ISASPage> {
        const params = this.getPagingParams(skip, take);

        return this.httpClient.get<ISASPage>(
            `${this.isasBaseUrl}/getLinkedBankStatements/${this.tenant}/${
                remittanceAdviceId}`,
            {observe: 'body', params});
    }

    private getPagingParams(skip?: number, take?: number): HttpParams {
        let page = 0;
        let size = 10;
        if (take) {
            size = take;
        }
        if (skip) {
            page = skip / size;
        }

        return new HttpParams()
            .set('page', JSON.stringify(page))
            .set('size', JSON.stringify(size));
    }
}
