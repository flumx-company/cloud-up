import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {InfoPopupComponent} from '../../../shared/components/info-popup/info-popup.component';
import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {ToleranceGroup} from '../../models/tolerance-group';

@Component({
  selector: 'app-payment-difference',
  templateUrl: './payment-difference.component.html',
  styleUrls: ['./payment-difference.component.css']
})

export class PaymentDifferenceComponent implements OnInit {
  @Input() currentToleranceGroup?: ToleranceGroup;
  @ViewChild(InfoPopupComponent) infoPopup?: InfoPopupComponent;

  customizeColumns = DataGridUtil.customizeColumns;

  constructor() {}

  ngOnInit() {}

  // tslint:disable-next-line:no-any
  showInfo(uuid: string, event: any) {
    event.stopImmediatePropagation();
    if (this.infoPopup && this.currentToleranceGroup) {
      this.infoPopup.showInfoForObject(
          this.currentToleranceGroup.paymentDifferences.find(
              paymDiff => paymDiff.uuid === uuid));
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
  onExporting(e: any) {
    e.component.beginUpdate();
    e.component.columnOption('paymentDifferenceId', 'visible', false);
    e.component.columnOption('uuid', 'visible', false);
  }

  // tslint:disable-next-line:no-any
  onExported(e: any) {
    e.component.columnOption('paymentDifferenceId', 'visible', true);
    e.component.columnOption('uuid', 'visible', true);
    e.component.endUpdate();
  }
}
