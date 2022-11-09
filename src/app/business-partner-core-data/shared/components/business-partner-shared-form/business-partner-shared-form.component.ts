import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DxFormComponent} from 'devextreme-angular';
import {isNullOrUndefined} from 'util';

import {ListObject} from '../../../../shared/models/list-object';
import {AccountingSystem} from '../../../models/accounting-system';
import {BusinessPartner} from '../../../models/business-partner';
import {MatchFieldList} from '../../../models/match-field-list';

@Component({
  selector: 'app-business-partner-shared-form',
  templateUrl: './business-partner-shared-form.component.html',
  styleUrls: ['./business-partner-shared-form.component.css']
})
export class BusinessPartnerSharedFormComponent implements OnInit {
  @Input() partner: BusinessPartner|undefined;
  @Input() accountingSystems: AccountingSystem[]|undefined;
  // tslint:disable-next-line:no-any
  @Output() submitForm: EventEmitter<any> = new EventEmitter();
  @ViewChild(DxFormComponent) form?: DxFormComponent;

  matchFieldList: ListObject[] = MatchFieldList.list;
  validateFields = this.validate.bind(this);
  formReady = false;

  constructor() {}

  ngOnInit() {}

  validate() {
    if (this.partner) {
      return !this.isEmpty(this.partner.businessPartner) ||
          !this.isEmpty(this.partner.iban) ||
          !this.isEmpty(this.partner.bankAccount) &&
          !this.isEmpty(this.partner.bankCode);
    }

    return false;
  }

  // tslint:disable-next-line:no-any
  onSubmit(e: any) {
    e.preventDefault();
    this.submitForm.emit(null);
  }

  isEmpty(field: string|undefined|null): boolean {
    return isNullOrUndefined(field) || field!.length <= 0;
  }
}
