import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {AmountTypeList} from '../../../shared/models/amount-type-list';
import {ImportReasonCode} from '../../models/import-reason-code';
import {AmountType} from "../../../accounting-system-core-data/models/amount-type";
import {AmountTypeService} from "../../../accounting-system-core-data/services/amount-type.service";
import {MessageToast} from "../../../shared/helpers/message-toast";

@Component({
  selector: 'app-import-reason-code',
  templateUrl: './import-reason-code.component.html',
  styleUrls: ['./import-reason-code.component.scss']
})
export class ImportReasonCodeComponent implements OnInit {
  @Input() @Output() importReasonCodes: ImportReasonCode[] = [];
  @Output() isHidden = new EventEmitter<boolean>();
  @Input() mode = '';
  @Input() currentImportReasonCode?: ImportReasonCode;

  amountTypesForReasonCodes = AmountTypeList.availableForReasonCodesList;
  internalAmountTypes: AmountType[] = [];
  filteredAmountTypes = this.internalAmountTypes;

  readOnlyFlag = true;

  validate = this.noDuplicatesExist.bind(this);

  constructor(private amountTypeService: AmountTypeService) {
  }

  ngOnInit() {
    this.amountTypeClassValueChanged = this.amountTypeClassValueChanged.bind(this);
    this.isAmountTypeIdentifierReadOnly = this.isAmountTypeIdentifierReadOnly.bind(this);

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
  }

  // tslint:disable-next-line:no-any
  saveImportReasonCode(e: any) {
    if (!e.validationGroup.validate().isValid) {
      return;
    }

    if (this.mode === 'Add') {
      if (isNullOrUndefined(this.importReasonCodes)) {
        this.importReasonCodes = [];
      }

      this.importReasonCodes.push(
        JSON.parse(JSON.stringify(this.currentImportReasonCode)));
    } else {
      this.importReasonCodes.splice(
        this.importReasonCodes.findIndex(
          importReasonCode =>
            importReasonCode.id === this.currentImportReasonCode!.id),
        1, JSON.parse(JSON.stringify(this.currentImportReasonCode)));
    }

    this.hideImportReasonCodeForm(true);
  }

  hideImportReasonCodeForm(hide: boolean) {
    window.location.hash = '';
    this.isHidden.emit(hide);
  }

  noDuplicatesExist(): boolean {
    return !this.importReasonCodes.some(c => c.externalReason === this.currentImportReasonCode!.externalReason);
  }

  // tslint:disable-next-line:no-any
  amountTypeClassValueChanged(e: any) {
    this.filteredAmountTypes = this.internalAmountTypes.filter(t => t.amountTypeClass === e.value);
    this.isAmountTypeIdentifierReadOnly();
  }

  isAmountTypeIdentifierReadOnly() {
    this.readOnlyFlag = this.currentImportReasonCode!.amountTypeClass === 'undefined';
  }
}
