import 'rxjs/add/operator/catch';

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

import {BaseService} from '../../shared/services/base.service';
import {MatchOptionValue} from '../models/match-option-value.enum';
import {OpenItem} from '../models/open-item';
import {ReferenceFieldSearchType} from '../models/reference-field-search-type';
import {SearchObject} from '../models/search-object';
import {SearchValues} from '../models/search-values';


@Injectable()
export class OpenItemCoreDataService extends BaseService {
  private readonly baseUrl: string =
      '/backend/openItemCoredata/api/v1/openItems';

  getOpenItems(): Observable<OpenItem[]> {
    return this.httpClient.get<OpenItem[]>(
        `${this.baseUrl}/${this.tenant}`, {observe: 'body'});
  }

  getOpenItemsFiltered(searchObject: SearchObject): Observable<OpenItem[]> {
    const searchQuery = this.buildSearchQuery(searchObject);

    return searchQuery ? this.httpClient.post<OpenItem[]>(
                             `${this.baseUrl}/readBySolrQuery/${this.tenant}`,
                             searchQuery, {observe: 'body'}) :
                         this.getOpenItems();
  }

  // tslint:disable-next-line:no-any
  getSearchValues(): Observable<SearchValues> {
    return this.httpClient
        .get<SearchValues>(
            `${this.baseUrl}/getSearchValues/${this.tenant}`, {observe: 'body'})
        .catch(this.handleError);
  }

  private buildSearchQuery(searchObject: SearchObject): string {
    let query = '';

    if (searchObject.matched.optionValue === MatchOptionValue.MATCHED) {
      query += `(matched:true)`;
    } else if (
        searchObject.matched.optionValue === MatchOptionValue.NOT_MATCHED) {
      query += `(matched:false)`;
    }

    if (searchObject.accountingSystemId) {
      query += ` AND (accountingSystemId:"${searchObject.accountingSystemId}")`;
    }

    if (searchObject.companyId) {
      query += ` AND (companyId:"${searchObject.companyId}")`;
    }

    if (searchObject.accountType) {
      query += ` AND (accountType:"${searchObject.accountType}")`;
    }

    if (searchObject.accounts) {
      const accounts = this.buildSubQuery(searchObject.accounts, 'account');
      if (accounts) {
        query += ` AND ${accounts}`;
      }
    }

    if (searchObject.documentNumbersString) {
      const documentNumbers = this.buildSubQuery(
          (!searchObject.documentNumbersString) ?
              [] :
              searchObject.documentNumbersString.split(','),
          'documentNumber');
      if (documentNumbers) {
        query += ` AND ${documentNumbers}`;
      }
    }

    if (searchObject.dateField) {
      query += ` AND (${searchObject.dateField}:)`;
      query +=
          searchObject.dateFrom ? `[${searchObject.dateFrom} TO` : `[* TO `;
      query += searchObject.dateTo ? `${searchObject.dateTo}]` : ` NOW]`;
      query += `) `;
    }

    if (searchObject.amount) {
      if (searchObject.amountCurrency) {
        query += (searchObject.amountField === 'localAmount') ?
            ` AND (localCurrency:"${searchObject.amountCurrency}")` :
            ` AND (documentCurrency:"${searchObject.amountCurrency}")`;

        // todo: make a string copy field on solr to use a regex to find the
        // amount ignoring the Currency-Module
        if (searchObject.amount) {
          if (searchObject.amountField === 'localAmount') {
            query += ` AND (localAmount:"${searchObject.amount},${
                searchObject.amountCurrency}")`;
          } else {
            query += ` AND (documentAmount:"${searchObject.amount},${
                searchObject.amountCurrency}")`;
          }
        }
      }
    }

    if (searchObject.referenceField1 && searchObject.referenceField1Value) {
      if (searchObject.referenceField1.searchType ===
          ReferenceFieldSearchType.equals) {
        query += ` AND (${searchObject.referenceField1.fieldName}:"${
            searchObject.referenceField1Value}")`;
      } else {
        query += ` AND (${searchObject.referenceField1.fieldName}:*${
            searchObject.referenceField1Value}*)`;
      }
    }

    if (searchObject.referenceField2 && searchObject.referenceField2Value) {
      if (searchObject.referenceField2.searchType ===
          ReferenceFieldSearchType.equals) {
        query += ` AND (${searchObject.referenceField2.fieldName}:"${
            searchObject.referenceField2Value}")`;
      } else {
        query += ` AND (${searchObject.referenceField2.fieldName}:*${
            searchObject.referenceField2Value}*)`;
      }
    }

    if (searchObject.referenceField3 && searchObject.referenceField3Value) {
      if (searchObject.referenceField3.searchType ===
          ReferenceFieldSearchType.equals) {
        query += ` AND (${searchObject.referenceField3.fieldName}:"${
            searchObject.referenceField3Value}")`;
      } else {
        query += ` AND (${searchObject.referenceField3.fieldName}:*${
            searchObject.referenceField3Value}*)`;
      }
    }


    query = query.trim();
    if (query.startsWith('AND')) {
      query = query.substr('AND'.length);
    }

    return query;
  }

  private buildSubQuery(array: string[], fieldName: string): string {
    if (!array || array.length < 1) {
      return '';
    }

    let subQuery: string;

    if (array.length === 1) {
      subQuery = ` (${fieldName}:"${array[0]}")`;
    } else {
      subQuery = ' (';
      array.forEach(value => {
        subQuery += ` (${fieldName}:"${value.trim()}") OR`;
      });
      subQuery = subQuery.substr(0, subQuery.length - ' OR'.length);
      subQuery += ')';
    }

    return subQuery;
  }

  // tslint:disable-next-line:no-any
  updateOpenItem(openItem: OpenItem): Observable<any> {
    if (!openItem) {
      throw new Error(
          'Required parameter openItem was null or undefined when calling updateOpenItem.');
    }

    const openItems = [openItem];

    return this.httpClient
        .put<OpenItem[]>(`${this.baseUrl}/${this.tenant}`, openItems, {
          observe: 'body',
        })
        .catch(this.handleError);
  }

  // tslint:disable-next-line:no-any
  deleteOpenItem(openItemId: string): Observable<any> {
    if (openItemId === null || openItemId === '') {
      throw new Error(
          'Required parameter openItemId was null or empty when calling deleteOpenItem.');
    }

    const openItemIds = [openItemId];

    return this.httpClient
        .request<string[]>(
            'delete', `${this.baseUrl}/${this.tenant}`,
            {body: openItemIds, observe: 'body'})
        .catch(this.handleError);
  }

  // tslint:disable-next-line:no-any
  handleError(error: any): ErrorObservable {
    return new ErrorObservable('error');
  }
}
