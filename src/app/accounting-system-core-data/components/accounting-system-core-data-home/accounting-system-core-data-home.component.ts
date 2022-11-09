import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DxDataGridComponent} from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import {confirm} from 'devextreme/ui/dialog';

import {InfoPopupComponent} from '../../../shared/components/info-popup/info-popup.component';
import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {MessageToast} from '../../../shared/helpers/message-toast';
import {AccountingSystem} from '../../models/accounting-system';
import {AmountTypeClass} from '../../models/amount-type-class';
import {ExportReasonCode} from '../../models/export-reason-code';
import {AccountingSystemCoreDataService} from '../../services/accounting-system-core-data.service';

@Component({
  selector: 'app-accounting-system-core-data-home',
  templateUrl: './accounting-system-core-data-home.component.html',
  styleUrls: ['./accounting-system-core-data-home.component.css']
})
export class AccountingSystemCoreDataHomeComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid?: DxDataGridComponent;
  @ViewChild(InfoPopupComponent) infoPopup?: InfoPopupComponent;
  customizeColumns = DataGridUtil.customizeColumns;
  dataSource: DataSource;

  constructor(
      private route: ActivatedRoute, private router: Router,
      private accountingSystemCoreDataService:
          AccountingSystemCoreDataService) {
    this.dataSource = new DataSource({
      store: new CustomStore({
        key: 'id',

        load: () => this.accountingSystemCoreDataService.getAccountingSystems()
                        .toPromise()
                        .then(accountingSystems => accountingSystems)
      })
    });
  }

  ngOnInit() {}

  // tslint:disable-next-line:no-any
  onToolbarPreparing(e: any) {
    e.toolbarOptions.items.unshift(
        {
          location: 'after',
          widget: 'dxButton',
          options: {
            hint: 'Refresh',
            icon: 'refresh',
            onClick: this.reloadAccountingSystems.bind(this)
          }
        },
        {
          location: 'after',
          widget: 'dxButton',
          options: {
            hint: 'Add Accounting System',
            icon: 'add',
            onClick: this.openAddView.bind(this)
          }
        });
  }

  private reloadAccountingSystems() {
    this.dataSource.reload();
  }

  // tslint:disable-next-line:no-any
  openEditView(id: number, event: any) {
    event.stopImmediatePropagation();
    this.router.navigate(['detail/edit', id], {relativeTo: this.route});
  }

  openAddView() {
    this.router.navigate(['detail/add'], {relativeTo: this.route});
  }

  // tslint:disable-next-line:no-any
  showInfo(id: number, event: any) {
    event.stopImmediatePropagation();
    if (this.infoPopup) {
      this.infoPopup.showInfoForObject(
          this.dataSource.items().find(system => system.id === id));
    }
  }

  // tslint:disable-next-line:no-any
  showReasonCodeInfo(uuid: string, event: any) {
    event.stopImmediatePropagation();

    if (this.infoPopup) {
      this.infoPopup.showInfoForObject(
          ([] as ExportReasonCode[])
              .concat(...this.dataSource.items().map(
                  (system: AccountingSystem) => system.exportReasonCodes))
              .find(code => code.uuid === uuid));
    }
  }

  // tslint:disable-next-line:no-any
  getDisplayName(technicalName: any) {
    const amountTypeClass = AmountTypeClass.list.find(
        typeClass => typeClass.technicalName === technicalName.value);
    if (amountTypeClass) {
      return amountTypeClass.displayName;
    }
    return technicalName.value;
  }

  // tslint:disable-next-line:no-any
  delete(id: number, event: any) {
    event.stopImmediatePropagation();

    const confirmResult = confirm(
        'Are you sure you want to delete this Accounting System?', 'Delete');
    confirmResult.then(res => {
      if (res) {
        this.accountingSystemCoreDataService.deleteAccountingSystem(id)
            .subscribe(
                () => this.dataSource.reload(),
                error => MessageToast.showError(error.message));
      }
    });
  }

  // tslint:disable-next-line:no-any
  onExporting(e: any) {
    e.component.beginUpdate();
    e.component.columnOption('id', 'visible', false);
  }

  // tslint:disable-next-line:no-any
  onExported(e: any) {
    e.component.columnOption('id', 'visible', true);
    e.component.endUpdate();
  }
}
