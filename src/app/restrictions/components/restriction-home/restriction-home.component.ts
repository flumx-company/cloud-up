import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {isNullOrUndefined} from 'util';

import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {MessageToast} from '../../../shared/helpers/message-toast';
import {InsertMetaData} from '../../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../../shared/models/update-meta-data';
import {AccountingSystemType} from '../../models/accounting-system-type';
import {Restriction} from '../../models/restriction';
import {RestrictionService} from '../../services/restriction.service';

@Component({
  selector: 'app-restriction-home',
  templateUrl: './restriction-home.component.html',
  styleUrls: ['./restriction-home.component.css']
})
export class RestrictionHomeComponent implements OnInit {
  restrictions: Restriction[] = [];
  currentPath = '';
  viewMode: string|null = '';
  filteredRestrictions: Restriction[] = [];
  currentRestriction: Restriction = new Restriction();
  infoVisible = false;
  // tslint:disable-next-line:no-any
  lastSelectedRowKey: any;
  hideMasterDetail = false;
  customizeColumns = DataGridUtil.customizeColumns;

  constructor(
      private route: ActivatedRoute, private router: Router,
      private restrictionService: RestrictionService) {
    this.readAllRestrictions();
  }

  ngOnInit() {
    this.route.url.subscribe(url => (this.currentPath = url[0].path));

    this.route.queryParamMap.subscribe(params => {
      if (params.has('mode')) {
        this.viewMode = params.get('mode');
      } else {
        this.viewMode = '';

        if (isNullOrUndefined(this.restrictions) ||
            this.restrictions.length <= 0) {
          this.readAllRestrictions();
        }
      }
    });
  }

  readAllRestrictions() {
    this.restrictionService.readAllRestrictions().subscribe(
        res => (this.restrictions = res), error => {
          if (error.status === 404) {
            this.restrictions = [];
          } else {
            MessageToast.showError(error.message);
          }
        });
    if (isNullOrUndefined(this.restrictions)) {
      this.restrictions = [];
    }
  }

  addRestriction() {
    const navigationExtras: NavigationExtras = {queryParams: {mode: 'Add'}};

    this.router.navigate([this.currentPath], navigationExtras);
  }

  // tslint:disable-next-line:no-any
  editRestriction(name: string, event: any) {
    event.stopImmediatePropagation();

    const navigationExtras:
        NavigationExtras = {queryParams: {mode: 'Edit', name}};

    this.router.navigate([this.currentPath], navigationExtras);
  }

  // tslint:disable-next-line:no-any
  removeRestriction(name: string, event: any) {
    event.stopImmediatePropagation();

    this.filterRestrictions(name);

    if (isNullOrUndefined(this.filteredRestrictions) ||
        this.filteredRestrictions.length <= 0) {
      const restriction = this.restrictions.find(
          restriction => restriction.entityId.name === name);
      if (restriction) {
        this.restrictionService.deleteRestriction(restriction)
            .subscribe(res => {
              const index = this.restrictions.findIndex(
                  restriction => restriction.entityId.name === name);
              this.restrictions.splice(index, 1);
            }, error => MessageToast.showError(error.message));
      }
    } else {
      MessageToast.showError(
          'Restriction is still in use; Please remove any references before deleting!');
    }
  }

  // tslint:disable-next-line:no-any
  showInfo(name: string, event: any) {
    event.stopImmediatePropagation();

    const infoObject = this.restrictions.find(
        restriction => restriction.entityId.name === name);

    if (infoObject) {
      this.currentRestriction = infoObject;

      if (isNullOrUndefined(this.currentRestriction.insertMetadata)) {
        this.currentRestriction.insertMetadata = new InsertMetaData();
      }

      if (isNullOrUndefined(this.currentRestriction.updateMetadata)) {
        this.currentRestriction.updateMetadata = new UpdateMetaData();
      }

      this.infoVisible = true;
    }
  }

  // tslint:disable-next-line:no-any
  showUsageInfo(name: string, event: any) {
    event.stopImmediatePropagation();

    const navigationExtras:
        NavigationExtras = {queryParams: {mode: 'usageInfo', name}};

    this.router.navigate([this.currentPath], navigationExtras);
  }

  getButtonBackground(name: string): string {
    this.filterRestrictions(name);
    if (isNullOrUndefined(this.filteredRestrictions) ||
        this.filteredRestrictions.length <= 0) {
      return 'bg-warning';
    } else {
      return 'bg-success';
    }
  }

  filterRestrictions(name: string) {
    this.filteredRestrictions = this.restrictions.filter(
        restriction => restriction.entityId.name !== name &&
            restriction.parts.find(part => part.restriction === name));
  }

  // tslint:disable-next-line:no-any
  getDisplayName(technicalName: any) {
    // need to define the list here because this function is treated as a
    // property of a dxDataGrid-cell ...
    const accountingSystemTypes =
        [new AccountingSystemType({technicalName: 'SAP', displayName: 'SAP'})];

    const accountingSystemType = accountingSystemTypes.find(
        type => type.technicalName === technicalName.value);

    if (accountingSystemType) {
      return accountingSystemType.displayName;
    }

    return '';
  }

  // tslint:disable-next-line:no-any
  selectionChanged(e: any) {
    e.component.collapseAll(-1);
    if (e.currentSelectedRowKeys[0] === this.lastSelectedRowKey) {
      if (this.hideMasterDetail) {
        this.hideMasterDetail = false;
        return;
      } else {
        this.hideMasterDetail = true;
      }
    } else {
      this.hideMasterDetail = false;
    }
    this.lastSelectedRowKey = e.currentSelectedRowKeys[0];
    e.component.expandRow(e.currentSelectedRowKeys[0]);
  }

  // tslint:disable-next-line:no-any
  onRestrictionsGridToolbarPreparing(e: any) {
    e.toolbarOptions.items.unshift(
        {
          location: 'after',
          widget: 'dxButton',
          options: {
            hint: 'Refresh',
            icon: 'refresh',
            onClick: this.readAllRestrictions.bind(this)
          }
        },
        {
          location: 'after',
          widget: 'dxButton',
          options: {
            hint: 'Add new Restriction',
            icon: 'add',
            onClick: this.addRestriction.bind(this)
          }
        });
  }

  // tslint:disable-next-line:no-any
  onContentReady(e: any) {
    e.component.option('loadPanel.enabled', false);
  }

  bracesAsString(bracesCount: number, start: boolean) {
    if (start) {
      return '['.repeat(bracesCount);
    } else {
      return ']'.repeat(bracesCount);
    }
  }
}
