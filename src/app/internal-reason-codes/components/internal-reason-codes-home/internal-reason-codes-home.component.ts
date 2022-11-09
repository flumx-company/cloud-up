// tslint:disable-next-line:no-any
declare var $: any;
import {Component, OnInit, ViewChild} from '@angular/core';
import {DxDataGridComponent} from 'devextreme-angular';
import {InternalReasonCodesService} from '../../services/internal-reason-codes.service';
import {AmountType} from '../../models';
import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {MessageToast} from '../../../shared/helpers/message-toast';
import {InfoPopupComponent} from '../../../shared/components/info-popup/info-popup.component';

@Component({
  selector: 'app-internal-reason-codes-home',
  templateUrl: './internal-reason-codes-home.component.html',
  styleUrls: ['./internal-reason-codes-home.component.scss']
})

export class InternalReasonCodesHomeComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  @ViewChild(InfoPopupComponent) infoPopup: InfoPopupComponent;

  title = 'Internal Reason Codes';
  dataSource: AmountType[] = [];
  infoVisible = false;
  customizeColumns = DataGridUtil.customizeColumns;

  constructor(private service: InternalReasonCodesService) {
    this.getDataFromServer();
  }

  ngOnInit() {}

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
      }
    );
  }

  // tslint:disable-next-line:no-any
  onCellPrepared(event: any) {
    const that = this;
    if (event.rowType === 'data' && event.column.command === 'edit') {
      if (event.data.predefinedType === true) {
        event.cellElement.innerHTML = '';
      }

      $('<a>')
        .addClass("dx-link dx-icon-info")
        // tslint:disable-next-line:no-any
        .on("click", (args: any) => that.showInfo(args, event))
        .prependTo(event.cellElement);
    }
  }

  // tslint:disable-next-line:no-any
  initNewRow(event: any) {
    event.data.amountTypeClass = 'DEDUCTION';
    event.data.predefinedType = false;
  }

  // tslint:disable-next-line:no-any
  onInsert(event: any) {
    const promise = this.service.create(event.data)
      .toPromise()
      .then(res => {
        return false;
      })
      .catch(error => {
        MessageToast.showError(error.message);
        return true;
      });

    event.cancel = promise;
  }

  // tslint:disable-next-line:no-any
  onUpdate(event: any) {
    const data = {...event.oldData, ...event.newData};

    const promise = this.service.update(data)
      .toPromise()
      .then(res => {
        return false;
      })
      .catch(error => {
        MessageToast.showError(error.message);
        return true;
      });

    event.cancel = promise;
  }

  // tslint:disable-next-line:no-any
  onRemove(event: any) {
    const promise = this.service.delete(event.data)
      .toPromise()
      .then(res => {
        return false;
      })
      .catch(error => {
        MessageToast.showError(error.message);
        return true;
      });

    event.cancel = promise;
  }

  refreshDataGrid() {
    this.getDataFromServer();
  }


  // tslint:disable-next-line:no-any
  showInfo(args: any, event: any) {
    if (this.infoPopup) {
      this.infoPopup.showInfoForObject(event.data);
    }
  }

  private getDataFromServer() {
    this.service.read().subscribe(
      res => {
        this.dataSource = res;
      },
      error => {
        MessageToast.showError(error.message);
      }
    );
  }
}
