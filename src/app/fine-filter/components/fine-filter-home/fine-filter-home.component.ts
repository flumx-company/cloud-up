import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DxDataGridComponent} from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import {confirm} from 'devextreme/ui/dialog';
import {isNullOrUndefined} from 'util';

import {InfoPopupComponent} from '../../../shared/components/info-popup/info-popup.component';
import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {MessageToast} from '../../../shared/helpers/message-toast';
import {AccountingSystemTypeList} from '../../../shared/models/accounting-system-type-list';
import {FormatTypeList} from '../../../shared/models/format-type-list';
import {ISAS} from '../../../shared/models/isas';
import {ListObject} from '../../../shared/models/list-object';
import {EntityId} from '../../models/entity-id';
import {FineFilter} from '../../models/fine-filter';
import {FineFilterTypeList} from '../../models/fine-filter-type-list';
import {MatchField} from '../../models/match-field';
import {MatchFieldList} from '../../models/match-field-list';
import {SearchTypeList} from '../../models/search-type-list';
import {ValidationTypeList} from '../../models/validation-type-list';
import {FineFilterService} from '../../services/fine-filter.service';
import {RestrictionService} from '../../services/restriction.service';

@Component({
  selector: 'app-fine-filter-home',
  templateUrl: './fine-filter-home.component.html',
  styleUrls: ['./fine-filter-home.component.css']
})
export class FineFilterHomeComponent implements OnInit {
  @ViewChild('fineFilterGrid') fineFilterGrid: DxDataGridComponent|undefined;
  @ViewChild(InfoPopupComponent) infoPopup: InfoPopupComponent|undefined;

  private basePath = 'fine-filter';
  private usedFilter: string[] = [];

  fineFilterDataSource: DataSource;
  searchArea = ['Search area'];
  validationArea = ['Validation'];
  matchFieldsArea = ['Matching fields'];
  customizeColumns = DataGridUtil.customizeColumns;

  constructor(
      private router: Router, private route: ActivatedRoute,
      private restrictionService: RestrictionService,
      private filterService: FineFilterService) {
    this.fineFilterDataSource = new DataSource({
      store: new CustomStore({
        load: () =>
            this.filterService.getFilterForTenant().toPromise().then(filter => {
              this.restrictionService
                  .checkFilterUsage(filter.map(filter => filter.filterId!))
                  .subscribe(
                      result => {
                        if (result.usageInfo) {
                          result.usageInfoMap =
                              new Map(Object.entries(result.usageInfo));
                          result.usageInfoMap.forEach((isUsed, filterName) => {
                            if (isUsed) {
                              this.usedFilter.push(filterName);
                            }
                          });
                        }
                      },
                      error => {
                        MessageToast.showError(error.message);
                      });
              return {data: filter};
            })
      })
    });
  }

  ngOnInit() {}

  readAll() {
    if (this.fineFilterGrid && this.fineFilterGrid.instance) {
      this.fineFilterGrid.instance.collapseAll(-1);
      setTimeout(() => this.fineFilterDataSource.reload(), 150);
    }
  }

  addFilter() {
    this.router.navigate(['add'], {relativeTo: this.route});
  }

  // tslint:disable-next-line:no-any
  editFilter(filterId: EntityId, event: any) {
    event.stopImmediatePropagation();

    this.router.navigate(['edit', filterId.name], {relativeTo: this.route});
  }

  // tslint:disable-next-line:no-any
  removeFilter(filterId: EntityId, event: any) {
    event.stopImmediatePropagation();

    const result = confirm('Delete this filter?', '');
    result.then(res => {
      if (res) {
        this.filterService.removeFilter(filterId).subscribe(
            res => {
              this.fineFilterDataSource.reload();
              MessageToast.showSuccess('Filter successfully deleted!');
            },
            error => {
              if (error.status === 409) {
                MessageToast.showError('Filter is still in use!');
              } else {
                MessageToast.showError(error.message);
              }
            });
      }
    });
  }

  // tslint:disable-next-line:no-any
  showUsageInfo(filterId: EntityId, event: any) {
    event.stopImmediatePropagation();

    this.router.navigate([this.basePath, 'usageInfo', filterId.name]);
  }

  // tslint:disable-next-line:no-any
  showFilterInfo(filterId: EntityId, event: any) {
    event.stopImmediatePropagation();

    if (this.infoPopup) {
      this.infoPopup.showInfoForObject(this.fineFilterDataSource.items().find(
          filter => filter.filterId.name === filterId.name));
    }
  }

  // tslint:disable-next-line:no-any
  showSettingInfo(id: number, settingType: string, event: any) {
    event.stopImmediatePropagation();

    if (this.infoPopup) {
      // tslint:disable-next-line:no-any
      let listObject: any;

      // tslint:disable-next-line:switch-default
      switch (settingType) {
        case 'isas': {
          listObject = this.findSetting(id, 'isasFields');
          break;
        }
        case 'oi': {
          listObject = this.findSetting(id, 'matchFields');
          break;
        }
        case 'search': {
          listObject = this.findSetting(id, 'searchExpressions');
          break;
        }
        case 'validation': {
          listObject = this.findSetting(id, 'validationFunctionConfigurations');
          break;
        }
      }

      if (listObject) {
        this.infoPopup.showInfoForObject(listObject);
      }
    }
  }

  // tslint:disable-next-line:no-any
  private findSetting(id: number, list: string): any {
    // tslint:disable-next-line:no-any
    let foundSetting: any;
    this.fineFilterDataSource.items().some(filter => {
      const settingObject =
          // tslint:disable-next-line:no-any
          filter[list].find((setting: any) => setting.id === id);
      if (settingObject) {
        foundSetting = settingObject;
        return true;
      }
      return false;
    });
    return foundSetting;
  }

  getButtonBackground(filterId: EntityId): string {
    if (!isNullOrUndefined(this.usedFilter) &&
        !isNullOrUndefined(
            this.usedFilter.find(filter => filter === filterId.name))) {
      return 'bg-success';
    } else {
      return 'bg-warning';
    }
  }

  // tslint:disable-next-line:no-any
  getValidationTypeDisplayName(technicalName: any): string {
    return ListObject.getDisplayName(
        technicalName.value, ValidationTypeList.list);
  }

  // tslint:disable-next-line:no-any
  getISASTableDisplayName(technicalName: any): string {
    return ListObject.getDisplayName(technicalName.value, ISAS.tables);
  }

  // tslint:disable-next-line:no-any
  getISASFieldDisplayName(technicalName: any): string {
    return ListObject.getDisplayName(
        technicalName.value,
        ([] as ListObject[])
            .concat(...ISAS.tables.map(table => table.isasFields)));
  }

  // tslint:disable-next-line:no-any
  getFilterTypeDisplayName(technicalName: any): string {
    return ListObject.getDisplayName(
        technicalName.value, FineFilterTypeList.list);
  }

  // tslint:disable-next-line:no-any
  getSearchTypeDisplayName(technicalName: any): string {
    return ListObject.getDisplayName(technicalName.value, SearchTypeList.list);
  }

  // tslint:disable-next-line:no-any
  getFormatTypeDisplayName(technicalName: any): string {
    return ListObject.getDisplayName(technicalName, FormatTypeList.list);
  }

  // tslint:disable-next-line:no-any
  getAccountingSystemTypeDisplayName(technicalName: any): string {
    return ListObject.getDisplayName(
        technicalName, AccountingSystemTypeList.list);
  }

  getMatchFieldDisplayName(id: number, filter: FineFilter): string {
    const matchField = filter.matchFields.find(field => field.id === id);
    if (matchField) {
      switch (filter.filterType) {
        case 'MATCHING':
        case 'EXTRACTION':
          return ListObject.getDisplayName(
              matchField.matchField!, MatchFieldList.fields);
        case 'BUSINESSPARTNER':
          if (matchField.matchField === 'contract') {
            return 'CONTRACT';
          } else {
            return ListObject.getDisplayName(
                matchField.accountType!, MatchFieldList.businesspartnerFields);
          }
        case 'REMITTANCE_ADVICE':
          return ListObject.getDisplayName(
              matchField.matchField!, MatchFieldList.remittanceAdviceFields);
        default:
      }
    }
    return '';
  }

  getMatchFieldDescription(id: number, filter: FineFilter) {
    const matchField = filter.matchFields.find(field => field.id === id);
    if (matchField) {
      switch (filter.filterType) {
        case 'MATCHING':
        case 'EXTRACTION':
          const oiField = MatchFieldList.fields.find(
              field => field.technicalName === matchField.matchField);
          return oiField ? oiField.description : '';
        case 'BUSINESSPARTNER':
          if (matchField.matchField === 'contract') {
            return 'Contract';
          } else {
            const field = MatchFieldList.businesspartnerFields.find(
                field => field.technicalName === matchField.accountType);
            return field ? field.description : '';
          }
        case 'REMITTANCE_ADVICE':
          const field = MatchFieldList.remittanceAdviceFields.find(
              field => field.technicalName === matchField.matchField);
          return field ? field.description : '';
        default:
      }
    }
    return '';
  }

  // tslint:disable-next-line:no-any
  onToolbarPreparing(e: any) {
    e.toolbarOptions.items.unshift(
        {
          location: 'after',
          widget: 'dxButton',
          options: {
            hint: 'Refresh',
            icon: 'refresh',
            onClick: this.readAll.bind(this)
          }
        },
        {
          location: 'after',
          widget: 'dxButton',
          options: {
            hint: 'Add new Filter',
            icon: 'add',
            onClick: this.addFilter.bind(this)
          }
        });
  }

  // tslint:disable-next-line:no-any
  selectionChanged(e: any) {
    e.component.collapseAll(-1);
    e.component.expandRow(e.currentSelectedRowKeys[0]);
    if (this.fineFilterGrid) {
      this.fineFilterGrid.instance.updateDimensions();
    }
  }

  areaSelectionChanged() {
    setTimeout(() => {
      if (this.fineFilterGrid) {
        this.fineFilterGrid.instance.updateDimensions();
      }
    }, 320);
  }

  getISASTableDescription(tableName: string) {
    const table = ISAS.tables.find(table => table.technicalName === tableName);
    if (table) {
      return table.description;
    }
    return '';
  }

  getISASFieldDescription(fieldName: string) {
    const field = ([] as ListObject[])
                      .concat(...ISAS.tables.map(table => table.isasFields))
                      .find(field => field.technicalName === fieldName);

    return field ? field.description : '';
  }

  // tslint:disable-next-line:no-any
  customizeIndex(index: any): string {
    return '' + (Number(index.value) + 1);
  }
}
