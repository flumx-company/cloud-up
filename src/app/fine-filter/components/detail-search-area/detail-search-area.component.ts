import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {v4 as UUIDv4} from 'uuid';

import {InfoPopupComponent} from '../../../shared/components/info-popup/info-popup.component';
import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {ISAS} from '../../../shared/models/isas';
import {ISASTable} from '../../../shared/models/isas-table';
import {ListObject} from '../../../shared/models/list-object';
import {FineFilter} from '../../models/fine-filter';
import {ISASField} from '../../models/isas-field';
import {SearchExpression} from '../../models/search-expression';
import {SearchTypeList} from '../../models/search-type-list';

@Component({
  selector: 'app-detail-search-area',
  templateUrl: './detail-search-area.component.html',
  styleUrls: ['./detail-search-area.component.css']
})
export class DetailSearchAreaComponent implements OnInit {
  @Input() currentFilter: FineFilter|undefined;
  @ViewChild(InfoPopupComponent) infoPopup: InfoPopupComponent|undefined;

  isasTableList: ISASTable[] = ISAS.tables;
  searchTypeList: ListObject[] = SearchTypeList.list;
  remittanceAdviceSearchTypeList: ListObject[] =
      SearchTypeList.list.filter(type => type.technicalName === 'VALUE');
  isasFieldList: ListObject[] = [];
  private invalidExprList: string[] = [];
  customizeColumns = DataGridUtil.customizeColumns;
  numberRegEx = new RegExp('^([0-9]{0,3})$');

  constructor() {}

  ngOnInit() {}

  @Input()
  set formatType(formatType: string) {
    this.isasTableList = ISAS.tables.filter(table => table.type === formatType);
  }

  @Input()
  set invalidRegEx(invalidRegEx: string[]) {
    this.invalidExprList = invalidRegEx;
  }

  removeSearchExpression(uuid: string) {
    if (this.currentFilter && this.currentFilter.searchExpressions &&
        this.currentFilter.searchExpressions.length > 0) {
      this.currentFilter.searchExpressions.splice(
          this.currentFilter.searchExpressions.findIndex(
              expression => expression.uuid === uuid),
          1);
    }
  }

  removeISASField(uuid: string) {
    if (this.currentFilter && this.currentFilter.isasFields &&
        this.currentFilter.isasFields.length > 0) {
      this.currentFilter.isasFields.splice(
          this.currentFilter.isasFields.findIndex(field => field.uuid === uuid),
          1);
    }
  }

  addISASField() {
    if (this.currentFilter) {
      if (!this.currentFilter.isasFields) {
        this.currentFilter.isasFields = [];
      }
      this.currentFilter.isasFields.push(new ISASField({uuid: UUIDv4()}));
    }
  }

  addSearchExpression() {
    if (this.currentFilter) {
      if (!this.currentFilter.searchExpressions) {
        this.currentFilter.searchExpressions = [];
      }
      this.currentFilter.searchExpressions.push(
          new SearchExpression({uuid: UUIDv4()}));
    }
  }

  getValue(uuid: string, settingList: string, settingField: string) {
    if (!this.currentFilter || !this.currentFilter[settingList]) {
      return null;
    }

    const settingObject = this.currentFilter[settingList].find(
        // tslint:disable-next-line:no-any
        (setting: any) => setting.uuid === uuid);
    if (!settingObject) {
      return null;
    }

    if (!settingObject[settingField]) {
      if (typeof settingObject[settingField] === 'string') {
        settingObject[settingField] = '';
      } else if (typeof settingObject[settingField] === 'number') {
        settingObject[settingField] = 0;
      } else if (typeof settingObject[settingField] === 'boolean') {
        settingObject[settingField] = false;
      } else {
        settingObject[settingField] = null;
      }
    }

    return settingObject[settingField];
  }


  changeValue(
      // tslint:disable-next-line:no-any
      uuid: string, event: any, settingList: string, settingField: string) {
    if (!this.currentFilter || !this.currentFilter[settingList]) {
      return;
    }

    const settingObject = this.currentFilter[settingList].find(
        // tslint:disable-next-line:no-any
        (setting: any) => setting.uuid === uuid);
    if (!settingObject) {
      return;
    }

    if (settingField === 'isasTable' &&
        settingObject[settingField] !== event.value) {
      settingObject['isasField'] = '';
    }

    if (settingField === 'regularExpression') {
      if (!event.value || event.value.length < 1) {
        event.component.isValid = false;
      }
    }

    if (settingField === 'searchType' && event.value === 'VALUE') {
      settingObject['prefix'] = 0;
      settingObject['separator'] = '';
    }

    settingObject[settingField] = event.value;
  }

  isMultipleRepetitionDisabled(uuid: string): boolean {
    if (this.currentFilter &&
        this.currentFilter.filterType !== 'REMITTANCE_ADVICE' &&
        this.currentFilter.searchExpressions) {
      return isNullOrUndefined(this.currentFilter.searchExpressions.find(
          expression => expression.uuid === uuid &&
              expression.searchType === 'ENUMERATION'));
    }

    return true;
  }

  showSettingInfo(uuid: string, settingType: string) {
    if (this.infoPopup) {
      // tslint:disable-next-line:no-any
      let listObject: any;

      // tslint:disable-next-line:switch-default
      switch (settingType) {
        case 'isas': {
          if (this.currentFilter && this.currentFilter.isasFields &&
              this.currentFilter.isasFields.length > 0) {
            listObject = this.currentFilter.isasFields.find(
                setting => setting.uuid === uuid);
          }
          break;
        }
        case 'search': {
          if (this.currentFilter && this.currentFilter.searchExpressions &&
              this.currentFilter.searchExpressions.length > 0) {
            listObject = this.currentFilter.searchExpressions.find(
                setting => setting.uuid === uuid);
          }
          break;
        }
      }

      if (listObject) {
        this.infoPopup.showInfoForObject(listObject);
      }
    }
  }

  // tslint:disable-next-line:no-any
  onToolbarPreparing(event: any, settingType: string) {
    // tslint:disable-next-line:switch-default
    switch (settingType) {
      case 'isas': {
        event.toolbarOptions.items.unshift({
          location: 'after',
          widget: 'dxButton',
          options: {
            hint: 'Add Payment Information field',
            icon: 'add',
            onClick: this.addISASField.bind(this)
          }
        });
        break;
      }
      case 'search': {
        event.toolbarOptions.items.unshift({
          location: 'after',
          widget: 'dxButton',
          options: {
            hint: 'Add search expression',
            icon: 'add',
            onClick: this.addSearchExpression.bind(this)
          }
        });
        break;
      }
    }
  }

  getISASFieldList(uuid: string): ListObject[] {
    if (this.currentFilter && this.currentFilter.isasFields) {
      const settingObject =
          this.currentFilter.isasFields.find(field => field.uuid === uuid);

      if (settingObject && settingObject.isasTable) {
        const isasTable = this.isasTableList.find(
            table => table.technicalName === settingObject.isasTable);

        if (isasTable) {
          return isasTable.isasFields;
        }
      }
    }

    return [];
  }

  isInvalidRegEx(uuid: string): string {
    if (this.currentFilter && this.currentFilter.searchExpressions) {
      if (this.currentFilter.searchExpressions.find(
              expr => expr.uuid === uuid &&
                  (!expr.regularExpression ||
                   expr.regularExpression.length < 1))) {
        return 'errorCell';
      }
    }

    if (this.invalidExprList.find(exprUuid => exprUuid === uuid)) {
      return 'errorCell';
    }

    return '';
  }

  isInvalidPattern(uuid: string): string {
    if (this.currentFilter && this.currentFilter.searchExpressions) {
      if (this.currentFilter.searchExpressions.find(
              expr => expr.uuid === uuid &&
                  (!expr.replacementPattern ||
                   expr.replacementPattern.length < 1))) {
        return 'errorCell';
      }
    }

    return '';
  }

  isInvalidPrefix(uuid: string): string {
    if (this.currentFilter && this.currentFilter.searchExpressions) {
      if (this.currentFilter.searchExpressions.find(
              expr => expr.uuid === uuid &&
                  (expr.searchType === 'INTERVAL' ||
                   expr.searchType === 'ENUMERATION') &&
                  (!this.numberRegEx.test(`${expr.prefix}`)))) {
        return 'errorCell';
      }
    }

    return '';
  }

  isPrefixAndDelimiterDisabled(uuid: string): boolean {
    return this.currentFilter ?
        this.currentFilter.filterType === 'REMITTANCE_ADVICE' ||
            isNullOrUndefined(this.currentFilter.searchExpressions.find(
                expr => expr.uuid === uuid &&
                    (expr.searchType === 'INTERVAL' ||
                     expr.searchType === 'ENUMERATION'))) :
        true;
  }

  isInvalidDelimiter(uuid: string): string {
    if (this.currentFilter && this.currentFilter.searchExpressions) {
      if (this.currentFilter.searchExpressions.find(
              expr => expr.uuid === uuid &&
                  (expr.searchType === 'INTERVAL' ||
                   expr.searchType === 'ENUMERATION') &&
                  (!expr.separator || expr.separator.length < 1))) {
        return 'errorCell';
      }
    }

    return '';
  }

  getISASTableDescription(uuid: string) {
    const isasField = this.currentFilter ?
        this.currentFilter.isasFields.find(expr => expr.uuid === uuid) :
        null;

    if (!isasField) {
      return;
    }

    const matchTable =
        ISAS.tables.find(table => table.technicalName === isasField.isasTable);
    if (matchTable) {
      return matchTable.description;
    }

    return;
  }

  getISASFieldDescription(uuid: string) {
    const isasField = this.currentFilter ?
        this.currentFilter.isasFields.find(expr => expr.uuid === uuid) :
        null;

    if (!isasField) {
      return;
    }

    const allFields =
        ([] as ListObject[])
            .concat(...ISAS.tables.map(table => table.isasFields));
    const field =
        allFields.find(field => field.technicalName === isasField.isasField);

    if (field) {
      return field.description;
    }

    return;
  }

  getSearchTypeList(): ListObject[] {
    return this.currentFilter ?
        this.currentFilter.filterType !== 'REMITTANCE_ADVICE' ?
        this.searchTypeList :
        this.remittanceAdviceSearchTypeList :
        [];
  }
}
