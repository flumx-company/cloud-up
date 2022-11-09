import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DxDataGridComponent} from 'devextreme-angular';
import {confirm} from 'devextreme/ui/dialog';
import {isNullOrUndefined} from 'util';
import {v4 as UUIDv4} from 'uuid';

import {InfoPopupComponent} from '../../../shared/components/info-popup/info-popup.component';
import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {DirtyCheck} from '../../../shared/helpers/dirty-check';
import {MessageToast} from '../../../shared/helpers/message-toast';
import {AccountingSystem} from '../../models/accounting-system';
import {AmountType} from '../../models/amount-type';
import {AmountTypeClass} from '../../models/amount-type-class';
import {AccountingSystemCoreDataService} from '../../services/accounting-system-core-data.service';
import {AmountTypeService} from '../../services/amount-type.service';

@Component({
  selector: 'app-accounting-system-core-data-detail',
  templateUrl: './accounting-system-core-data-detail.component.html',
  styleUrls: ['./accounting-system-core-data-detail.component.scss']
})
export class AccountingSystemCoreDataDetailComponent implements OnInit {
  @ViewChild(InfoPopupComponent) infoPopup?: InfoPopupComponent;
  @ViewChild(DxDataGridComponent) dataGrid?: DxDataGridComponent;

  mode?: string;
  name?: string;
  backupAccountingSystem = '';
  accountingSystem = new AccountingSystem();
  customizeColumns = DataGridUtil.customizeColumns;
  internalAmountTypes: AmountType[] = [];
  amountTypeClassList = AmountTypeClass.list;

  constructor(
      private router: Router, private route: ActivatedRoute,
      private accountingSystemService: AccountingSystemCoreDataService,
      private amountTypeService: AmountTypeService) {}

  ngOnInit() {
    this.getFilteredAmountTypeIdentifier =
        this.getFilteredAmountTypeIdentifier.bind(this);

    this.route.params.subscribe(params => {
      this.mode = params['mode'];
      if (params['id']) {
        this.accountingSystemService.getAccountingSystem(params['id'])
            .subscribe(res => {
              this.accountingSystem = res;
              this.backupAccountingSystem =
                  DirtyCheck.getStringFromStringOrObject(this.accountingSystem);
              this.name = res.name;
            }, error => MessageToast.showError(error.message));
      } else {
        this.accountingSystem = new AccountingSystem({tenant: 1});
      }
      this.amountTypeService.getAllAmountTypes().subscribe(
          data => {
            this.internalAmountTypes = data;
          },
          error => {
            if (error.status !== 404) {
              MessageToast.showError(error.message);
            }
            this.internalAmountTypes = [];
          });
    });
  }

  navBack() {
    if (!DirtyCheck.isDirty(
            this.accountingSystem, this.backupAccountingSystem)) {
      this.router.navigate(['accounting-systems']);
      return;
    }

    const result = confirm('Continue without saving?', '');
    result.then(res => {
      if (res) {
        this.router.navigate(['accounting-systems']);
      }
    });
  }

  // tslint:disable-next-line:no-any
  onSubmit(event: any) {
    event.preventDefault();
    if (this.mode === 'add') {
      this.accountingSystemService.insertAccountingSystem(this.accountingSystem)
          .subscribe(
              res => {
                this.router.navigate(['accounting-systems']);
              },
              error => {
                if (error.status === 409) {
                  MessageToast.showError(
                      'Accounting System with this name already exists!');
                } else {
                  MessageToast.showError(error.message);
                }
              });
    } else {
      this.accountingSystemService.updateAccountingSystem(this.accountingSystem)
          .subscribe(
              res => {
                this.router.navigate(['accounting-systems']);
              },
              error => {
                if (error.status === 409) {
                  MessageToast.showError(
                      'Accounting System with this name already exists!');
                } else {
                  MessageToast.showError(error.message);
                }
              });
    }
  }

  // tslint:disable-next-line:no-any
  onCellPrepared(event: any) {
    if (event.rowType === 'data' && event.column.command === 'edit') {
      const isEditing = event.row.isEditing, cellElement = event.cellElement;

      if (isEditing) {
        const saveLink = cellElement.querySelector('.dx-link-save'),
              cancelLink = cellElement.querySelector('.dx-link-cancel');

        saveLink.classList.add('dx-icon-save');
        cancelLink.classList.add('dx-icon-revert');

        saveLink.textContent = '';
        cancelLink.textContent = '';
      } else {
        const editLink = cellElement.querySelector('.dx-link-edit'),
              deleteLink = cellElement.querySelector('.dx-link-delete');

        editLink.classList.add('dx-icon-edit');
        deleteLink.classList.add('dx-icon-trash');

        editLink.textContent = '';
        deleteLink.textContent = '';
      }
    }
  }

  // tslint:disable-next-line:no-any
  rowValidating(event: any) {
    if (event && event.brokenRules && event.brokenRules.length > 0) {
      event.errorText = event.brokenRules[0].message;
    }

    const duplicate =
        !isNullOrUndefined(this.accountingSystem.exportReasonCodes.find(
            code => code.amountTypeIdentifier ===
                    event.newData.amountTypeIdentifier &&
                code.externalReason === event.newData.externalReason));

    if (duplicate) {
      event.errorText = 'Entry already exists';
      event.isValid = false;
    }
  }

  // tslint:disable-next-line:no-any
  onFileSaving(event: any) {
    if (this.accountingSystem) {
      event.fileName = `export_reason_codes_of_${this.accountingSystem.name}`;
    }
  }

  // tslint:disable-next-line:no-any
  insertedNewRow(event: any) {
    event.data.uuid = UUIDv4();
  }

  // tslint:disable-next-line:no-any
  showInfo(uuid: string, event: any) {
    event.stopImmediatePropagation();
    if (this.infoPopup) {
      this.infoPopup.showInfoForObject(
          this.accountingSystem.exportReasonCodes.find(
              code => code.uuid === uuid));
    }
  }

  showAccountingSystemInfo() {
    if (this.infoPopup) {
      this.infoPopup.showInfoForObject(this.accountingSystem);
    }
  }

  // tslint:disable-next-line:no-any
  prepareToolbar(event: any) {
    event.toolbarOptions.items.splice(1, 0, {
      location: 'after',
      widget: 'dxButton',
      options: {
        hint: 'Delete selected',
        icon: 'trash',
        onClick: this.deleteBatch.bind(this)
      }
    });
  }

  // tslint:disable-next-line:no-any
  onEditorPreparing(event: any) {
    if (event.parentType === 'dataRow' &&
        event.dataField === 'amountTypeIdentifier') {
      event.editorOptions.disabled =
          (typeof event.row.data.amountTypeClass !== 'string');
    }

    if (event.parentType === 'filterRow' &&
        event.dataField === 'amountTypeIdentifier' && event.lookup) {
      event.lookup.update();
    }
  }

  // tslint:disable-next-line:no-any
  setAmountTypeClass(rowData: any, value: any) {
    rowData.amountTypeIdentifier = undefined;
    // tslint:disable-next-line:no-any
    (this as any).defaultSetCellValue(rowData, value);
  }

  // tslint:disable-next-line:no-any
  getFilteredAmountTypeIdentifier(options: any) {
    return {
      store: this.internalAmountTypes,
      filter: options.data ?
          ['amountTypeClass', '=', options.data.amountTypeClass] :
          undefined
    };
  }

  deleteBatch() {
    const confirmResult = confirm(
        'Are you sure you want to delete the selected Export Reason Codes?',
        'Delete');
    confirmResult.then(res => {
      if (res && this.dataGrid) {
        this.dataGrid.instance.getSelectedRowKeys().forEach(
            key => this.accountingSystem.exportReasonCodes.splice(
                this.accountingSystem.exportReasonCodes.findIndex(
                    code => code.uuid === key.uuid),
                1));
      }
    });
  }

  // tslint:disable-next-line:no-any
  onExporting(e: any) {
    e.component.beginUpdate();
    e.component.columnOption('uuid', 'visible', false);
  }

  // tslint:disable-next-line:no-any
  onExported(e: any) {
    e.component.columnOption('uuid', 'visible', true);
    e.component.endUpdate();
  }
}
