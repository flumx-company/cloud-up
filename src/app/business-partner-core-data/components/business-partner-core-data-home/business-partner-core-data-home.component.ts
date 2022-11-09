import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {DxDataGridComponent} from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import {confirm} from 'devextreme/ui/dialog';
import {isNullOrUndefined} from 'util';

import {InfoPopupComponent} from '../../../shared/components/info-popup/info-popup.component';
import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {MessageToast} from '../../../shared/helpers/message-toast';
import {BusinessPartner} from '../../models/business-partner';
import {MatchFieldList} from '../../models/match-field-list';
import {BusinessPartnerCoreDataService} from '../../services/business-partner-core-data.service';

@Component({
  selector: 'app-business-partner-core-data-home',
  templateUrl: './business-partner-core-data-home.component.html',
  styleUrls: ['./business-partner-core-data-home.component.css']
})
export class BusinessPartnerCoreDataHomeComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent|undefined;
  @ViewChild(InfoPopupComponent) infoPopup: InfoPopupComponent|undefined;

  title = 'Sender Information';
  gridDataSource: CustomStore;
  infoVisible = false;
  customizeColumns = DataGridUtil.customizeColumns;

  constructor(
      private service: BusinessPartnerCoreDataService, private router: Router) {
    this.gridDataSource = new CustomStore({
      key: 'businessPartnerId',
      // tslint:disable-next-line:no-any
      load(options: any) {
        return service.getAll()
            .toPromise()
            .then((data: BusinessPartner[]) => {
              return {data};
            })
            .catch(error => {
              if (error.status !== 404) {
                throw new Error('Error loading data');
              }
            });
      },
      remove(key) {
        return service.delete(encodeURIComponent(key))
            .subscribe(
                res => res, error => MessageToast.showError(error.message));
      },
      byKey(key) {
        return service.getById(key).toPromise();
      }
    });
  }

  ngOnInit() {}

  // tslint:disable-next-line:no-any
  updatePartner(id: number, event: any) {
    event.stopImmediatePropagation();

    this.router.navigate(['business-partner-core-data/partner', 'update', id]);
  }

  // tslint:disable-next-line:no-any
  deletePartner(id: number, event: any) {
    event.stopImmediatePropagation();

    const confirmResult = confirm(
        'Are you sure you want to delete this Business Partner?', 'Delete');
    confirmResult.then(res => {
      if (res) {
        this.gridDataSource.remove(id).then(
            key => this.refreshDataGrid(),
            error => MessageToast.showError(error));
      }
    });
  }

  // tslint:disable-next-line:no-any
  onToolbarPreparing(event: any) {
    event.toolbarOptions.items.unshift(
        {
          location: 'after',
          widget: 'dxButton',
          options: {
            hint: 'Refresh',
            icon: 'refresh',
            onClick: this.refreshDataGrid.bind(this)
          }
        },
        {
          location: 'after',
          widget: 'dxButton',
          options: {
            hint: 'Add new BusinessPartner',
            icon: 'add',
            onClick: this.navToCreate.bind(this)
          }
        },
        {
          location: 'after',
          widget: 'dxButton',
          options: {
            hint: 'Delete selected',
            icon: 'trash',
            onClick: this.deleteSelected.bind(this)
          }
        });
  }

  deleteSelected() {
    const confirmResult =
        confirm('Are you sure you want to delete all selected?', 'Delete');
    confirmResult.then(res => {
      if (res) {
        if (this.dataGrid && this.dataGrid.instance) {
          this.dataGrid.instance.getSelectedRowKeys().forEach(
              key => this.gridDataSource.remove(key));
          this.refreshDataGrid();
        }
      }
    });
  }

  refreshDataGrid() {
    if (this.dataGrid) {
      this.dataGrid.instance.clearSelection();
      this.dataGrid.instance.refresh();
    }
  }

  navToCreate() {
    this.router.navigate(['business-partner-core-data/partner', 'create']);
  }

  // tslint:disable-next-line:no-any
  showInfo(businessPartnerId: number, event: any) {
    event.stopImmediatePropagation();

    this.gridDataSource.byKey(businessPartnerId)
        .then((data: BusinessPartner) => {
          if (this.infoPopup) {
            this.infoPopup.showInfoForObject(data);
          }
        });
  }

  getMatchFieldDisplayName(partner: BusinessPartner): string {
    if (isNullOrUndefined(partner) || isNullOrUndefined(partner.matchField)) {
      return '';
    }

    let matchField = MatchFieldList.list.find(
        field => field.technicalName === partner.matchField);

    if (!matchField) {
      if (isNullOrUndefined(partner.accountType)) {
        return '';
      }

      matchField = MatchFieldList.list.find(
          type => type.technicalName === partner.accountType);

      if (matchField) {
        return matchField.displayName;
      }
    } else {
      return matchField.displayName;
    }

    return '';
  }

  // tslint:disable-next-line:no-any
  onExporting(e: any) {
    e.component.beginUpdate();
    e.component.columnOption('businessPartnerId', 'visible', false);
  }

  // tslint:disable-next-line:no-any
  onExported(e: any) {
    e.component.columnOption('businessPartnerId', 'visible', true);
    e.component.endUpdate();
  }
}
