import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {DxDataGridComponent} from 'devextreme-angular';
import {confirm} from 'devextreme/ui/dialog';
import {isNullOrUndefined} from 'util';
import {v4 as UUIDv4} from 'uuid';

import {InfoPopupComponent} from '../../../shared/components/info-popup/info-popup.component';
import {DirtyCheck} from '../../../shared/helpers/dirty-check';
import {MessageToast} from '../../../shared/helpers/message-toast';
import {AccountingSystemTypeList} from '../../../shared/models/accounting-system-type-list';
import {FormatTypeList} from '../../../shared/models/format-type-list';
import {ListObject} from '../../../shared/models/list-object';
import {EntityId} from '../../models/entity-id';
import {FineFilter} from '../../models/fine-filter';
import {FineFilterTypeList} from '../../models/fine-filter-type-list';
import {FineFilterService} from '../../services/fine-filter.service';
import {RestrictionService} from '../../services/restriction.service';

@Component({
  selector: 'app-fine-filter-detail',
  templateUrl: './fine-filter-detail.component.html',
  styleUrls: ['./fine-filter-detail.component.css']
})
export class FineFilterDetailComponent implements OnInit {
  @ViewChild('isasGrid') isasGrid: DxDataGridComponent|undefined;
  @ViewChild(InfoPopupComponent) infoPopup: InfoPopupComponent|undefined;

  private basePath = 'fine-filter';
  private waitForBackend = false;

  formatTypeList: ListObject[] = FormatTypeList.list;
  remittanceAdviceFormatTypeList: ListObject[] = FormatTypeList.list.filter(
      type => type.technicalName !== 'REMITTANCE_ADVICE');
  accountingSystemTypeList: ListObject[] = AccountingSystemTypeList.list;
  filterTypeList: ListObject[] = FineFilterTypeList.list;
  viewMode: string|undefined|null;
  name: string|undefined|null;
  currentFilter: FineFilter = new FineFilter();
  isFilterUsed = 'bg-warning';
  invalidRegExList: string[] = [];
  backupFilter = '';
  validateLimitsFunc = this.validateLimits.bind(this);

  constructor(
      private route: ActivatedRoute, private router: Router,
      private filterService: FineFilterService,
      private restrictionService: RestrictionService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (isNullOrUndefined(params['name'])) {
        this.viewMode = 'Add';
        this.currentFilter = new FineFilter({filterId: new EntityId()});
      } else {
        this.viewMode = 'Edit';
        this.name = params['name'];
        this.loadCurrentFilter();
      }
    });
  }

  // tslint:disable-next-line:no-any
  save(event: any) {
    event.preventDefault();

    if (!this.waitForBackend) {
      this.waitForBackend = true;

      if (this.validate()) {
        const filter: FineFilter =
            JSON.parse(JSON.stringify(this.currentFilter));
        if (filter.filterType === 'BUSINESSPARTNER' && filter.matchFields &&
            filter.matchFields.length > 0) {
          filter.matchFields.forEach(matchField => {
            if (matchField.matchField !== 'contract') {
              matchField.accountType = matchField.matchField;
              matchField.matchField = 'account';
            }
          });
        }

        if (this.viewMode === 'Add') {
          this.createFineFilter(filter);
        } else {
          this.updateFineFilter(filter);
        }
      } else {
        this.waitForBackend = false;
      }
    }
  }

  private createFineFilter(filter: FineFilter) {
    this.filterService.createFilter(filter).subscribe(
        res => {
          this.waitForBackend = false;
          const navigationExtras:
              NavigationExtras = {queryParams: {refresh: 'true'}};
          this.router.navigate([this.basePath], navigationExtras);
        },
        error => {
          this.waitForBackend = false;

          if (error.status === 400) {
            if (error.error && error.error.invalidRegExUUIDs &&
                error.error.invalidRegExUUIDs.length > 0) {
              this.invalidRegExList = error.error.invalidRegExUUIDs;
              MessageToast.showError(error.error.message);
            } else {
              MessageToast.showError('Filter is invalid!');
            }
          } else if (error.status === 409) {
            MessageToast.showError('Name is already in use!');
          } else {
            MessageToast.showError(error.message);
          }
        });
  }

  private updateFineFilter(filter: FineFilter) {
    this.filterService.updateFilter(filter).subscribe(
        res => {
          this.waitForBackend = false;
          const navigationExtras:
              NavigationExtras = {queryParams: {refresh: 'true'}};
          this.router.navigate([this.basePath], navigationExtras);
        },
        error => {
          this.waitForBackend = false;
          if (error.status === 400) {
            if (error.invalidRegExUUIDs && error.invalidRegExUUIDs.length > 0) {
              this.invalidRegExList = error.invalidRegExUUIDs;
              MessageToast.showError(error.message);
            } else {
              MessageToast.showError('Filter is invalid!');
            }
          } else {
            MessageToast.showError(error.message);
          }
        });
  }

  private validate(): boolean {
    if (!this.currentFilter) {
      return false;
    }

    if (this.isFilterType('MATCHING', 'EXTRACTION', 'REMITTANCE_ADVICE')) {
      if (this.isISASFieldsEmpty()) {
        MessageToast.showError('Select at least one Payment Information field');
        return false;
      }

      if (this.isSearchExpressionsEmpty()) {
        MessageToast.showError('Define at least one search expression');
        return false;
      }
    }

    if (this.isFilterType('MATCHING', 'REMITTANCE_ADVICE', 'BUSINESSPARTNER') &&
        this.isMatchFieldsEmpty()) {
      MessageToast.showError('Select at least one match field');
      return false;
    }

    return true;
  }

  private isISASFieldsEmpty(): boolean {
    if (!this.currentFilter.isasFields ||
        this.currentFilter.isasFields.length < 1) {
      return true;
    }
    return false;
  }

  private isMatchFieldsEmpty(): boolean {
    if (!this.currentFilter.matchFields ||
        this.currentFilter.matchFields.length < 1) {
      return true;
    }
    return false;
  }

  private isSearchExpressionsEmpty(): boolean {
    if (!this.currentFilter.searchExpressions ||
        this.currentFilter.searchExpressions.length < 1) {
      return true;
    }

    return this.currentFilter.searchExpressions
               .filter(
                   expr => !expr.regularExpression ||
                       expr.regularExpression.length < 1 ||
                       !expr.replacementPattern ||
                       expr.replacementPattern.length < 1)
               .length > 0;
  }

  private isFilterType(...types: string[]): boolean {
    if (types.find(type => this.currentFilter.filterType === type)) {
      return true;
    }
    return false;
  }

  private loadCurrentFilter() {
    this.filterService.getFilterById(new EntityId({name: this.name}))
        .subscribe(res => {
          this.currentFilter = res;
          if (this.currentFilter.filterType === 'BUSINESSPARTNER' &&
              this.currentFilter.matchFields &&
              this.currentFilter.matchFields.length > 0) {
            this.currentFilter.matchFields.forEach(matchField => {
              if (matchField.matchField === 'account') {
                matchField.matchField = matchField.accountType;
              }
            });
          }

          this.setUUIDs();
          this.backupFilter =
              DirtyCheck.getStringFromStringOrObject(this.currentFilter);
          if (this.currentFilter.filterId) {
            this.restrictionService.isFilterUsed(this.currentFilter.filterId)
                .subscribe(
                    result => {
                      this.isFilterUsed = 'bg-warning';
                    },
                    error => {
                      if (error.status === 409) {
                        this.isFilterUsed = 'bg-success';
                      } else {
                        MessageToast.showError(error.message);
                      }
                    });
          }
        }, error => MessageToast.showError(error.message));
  }

  private setUUIDs() {
    if (isNullOrUndefined(this.currentFilter.searchExpressions)) {
      this.currentFilter.searchExpressions = [];
    }
    if (isNullOrUndefined(this.currentFilter.isasFields)) {
      this.currentFilter.isasFields = [];
    }
    if (isNullOrUndefined(this.currentFilter.matchFields)) {
      this.currentFilter.matchFields = [];
    }
    if (isNullOrUndefined(
            this.currentFilter.validationFunctionConfigurations)) {
      this.currentFilter.validationFunctionConfigurations = [];
    }

    this.currentFilter.searchExpressions.forEach(
        expression => (expression.uuid = UUIDv4()));
    this.currentFilter.isasFields.forEach(field => (field.uuid = UUIDv4()));
    this.currentFilter.matchFields.forEach(field => (field.uuid = UUIDv4()));
  }

  navBack() {
    if (DirtyCheck.isDirty(this.currentFilter, this.backupFilter)) {
      const result = confirm('Continue without saving?', '');
      result.then(res => {
        if (res) {
          this.router.navigate([this.basePath]);
        }
      });
    } else {
      this.router.navigate([this.basePath]);
    }
  }

  showFilterInfo() {
    if (this.currentFilter && this.infoPopup) {
      this.infoPopup.showInfoForObject(this.currentFilter);
    }
  }

  showUsageInfo() {
    if (this.currentFilter.filterId) {
      this.router.navigate(
          [this.basePath, 'usageInfo', this.currentFilter.filterId.name]);
    }
  }

  isFilterTypeSet() {
    if (this.currentFilter && this.currentFilter.filterType) {
      return true;
    }
    return false;
  }

  isFormItemVisible(field: string) {
    if (this.currentFilter && this.currentFilter.filterType) {
      if (this.currentFilter.filterType === 'BUSINESSPARTNER' &&
          field === 'formatType') {
        return false;
      }

      if ((this.currentFilter.filterType === 'REMITTANCE_ADVICE' ||
           this.currentFilter.filterType === 'EXTRACTION') &&
          field === 'accountingSystemType') {
        return false;
      }

      return true;
    }
    return false;
  }

  getFormatTypeList(): ListObject[] {
    return this.currentFilter ?
        this.currentFilter.filterType === 'REMITTANCE_ADVICE' ?
        this.remittanceAdviceFormatTypeList :
        this.formatTypeList :
        [];
  }

  validateLimits(): boolean {
    return this.currentFilter.validationUpperLimit &&
            this.currentFilter.validationUpperLimit.length > 0 &&
            this.currentFilter.validationLowerLimit &&
            this.currentFilter.validationLowerLimit.length > 0 ?
        Number(this.currentFilter.validationUpperLimit) >
            Number(this.currentFilter.validationLowerLimit) :
        true;
  }
}
