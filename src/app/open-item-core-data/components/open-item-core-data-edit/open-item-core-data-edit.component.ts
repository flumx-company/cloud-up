import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';

import {OpenItem} from '../../models/open-item';
import {OpenItemCoreDataService} from '../../services/open-item-core-data.service';
import {AccountingSystem} from "../../../shared/models/accounting-system";
import {AccountingSystemService} from "../../../shared/services/accounting-system.service";
import {MessageToast} from "../../../shared/helpers/message-toast";
import {isNullOrUndefined} from "util";
import {DirtyCheck} from "../../../shared/helpers/dirty-check";
import {confirm} from "devextreme/ui/dialog";

@Component({
  selector: 'app-open-item-core-data-edit',
  templateUrl: './open-item-core-data-edit.component.html',
  styleUrls: ['./open-item-core-data-edit.component.css']
})
export class OpenItemCoreDataEditComponent implements OnInit {
  currentPath = '';

  //todo: make all fields exclude 'matched' readonly

  @Input('current-object') currentObject: OpenItem|undefined;
  @Input('backup-current-object') backupCurrentObject: string|undefined;

  readOnly = false;

  accountingSystems: AccountingSystem[] = [];

  //todo: replace by service call
  currencies = ['EUR', 'USD', 'ETH', 'BTC', 'DMO'];

  constructor(
      private openItemCoreDataService: OpenItemCoreDataService,
      private accountingSystemService: AccountingSystemService,
      private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    if (isNullOrUndefined(this.accountingSystems) || this.accountingSystems.length < 1) {
      this.readAllAccountingSystems();
    }

    this.route.url.subscribe(url => (this.currentPath = url[0].path));
  }

  readAllAccountingSystems() {
    this.accountingSystemService.readAllAccountingSystems().subscribe(
      res => (this.accountingSystems = res), error => {
        if (error.status === 204) {
          this.accountingSystems = [];
        } else {
          MessageToast.showError(error.message);
        }
      });
  }

  // tslint:disable-next-line:no-any
  save(event: any) {
    if (this.currentObject) {
      this.normalizeDateFields(this.currentObject);
      this.normalizeAmountFields(this.currentObject);


      this.openItemCoreDataService.updateOpenItem(this.currentObject)
          .subscribe(
              res => {},
              error => MessageToast.showError(error.message)
          );

      this.showMasterView();
    }
  }

  navBack() {
    const currentObjectString = JSON.stringify(this.currentObject, (key, value) => isNullOrUndefined(value) ? '' : value);
    const isDirty = DirtyCheck.isDirty(currentObjectString, (this.backupCurrentObject) ? this.backupCurrentObject : '');

    if (!isDirty) {
      this.showMasterView();
      return;
    }

    const result = confirm('Continue without saving?', '');
    result.then(res => {
      if (res) {
        this.showMasterView();
      }
    });
  }

  private showMasterView() {
    const navigationExtras: NavigationExtras = {
      queryParams: {'mode': 'master'},
    };
    this.router.navigate([this.currentPath], navigationExtras);
  }

  // removes time and timezone information from string
  private normalizeDateFields(openItem: OpenItem) {

    if (openItem.fiscalYear) {
      openItem.fiscalYear = this.getShortDateString(openItem.fiscalYear);
    }

    if (openItem.documentDate) {
      openItem.documentDate = this.getShortDateString(openItem.documentDate);
    }

    if (openItem.postingDate) {
      openItem.postingDate = this.getShortDateString(openItem.postingDate);
    }

    if (openItem.baselineDate) {
      openItem.baselineDate = this.getShortDateString(openItem.baselineDate);
    }

    if (openItem.netPaymentDate) {
      openItem.netPaymentDate = this.getShortDateString(openItem.netPaymentDate);
    }

    if (openItem.creationDate) {
      openItem.creationDate = this.getShortDateString(openItem.creationDate);
    }

    if (openItem.creationTime) {
      // bring time to HHmmss format
      openItem.creationTime = openItem.creationTime.toString().substr(11,8).replace(/:/g,'');
    }
  }

  private getShortDateString(dateString: string): string {
    // bring date to yyyyMMdd format
    return dateString.toString().substr(0, 10).replace(/-/g,'');
  }

  private normalizeAmountFields(openItem: OpenItem) {

    if (openItem.documentAmount) {
      openItem.documentAmount = this.addCurrencyIfNotExist(openItem.documentAmount, openItem.documentCurrency);
    }

    if (openItem.documentAmountEligibleCashDiscount) {
      openItem.documentAmountEligibleCashDiscount = this.addCurrencyIfNotExist(openItem.documentAmountEligibleCashDiscount, openItem.documentCurrency);
    }

    if (openItem.documentAmountCashDiscount) {
      openItem.documentAmountCashDiscount = this.addCurrencyIfNotExist(openItem.documentAmountCashDiscount, openItem.documentCurrency);
    }

    if (openItem.localAmount) {
      openItem.localAmount = this.addCurrencyIfNotExist(openItem.localAmount, openItem.localCurrency);
    }
  }

  private addCurrencyIfNotExist(fieldValue: string, currency: string|undefined): string {
    if (fieldValue.length < 4) {
      return fieldValue + ',' + (currency ? currency : 'EUR');
    }

    if (fieldValue.substr(fieldValue.length - 3, 1) === ',') {
      fieldValue = fieldValue
        .replace(/\./g, '')
        .replace(/,/g, '.');
    }

    if (/,[a-zA-Z]{3}$/g.test(fieldValue)){
      return fieldValue;
    }

    return fieldValue + ',' + (currency ? currency : 'EUR');

  }
}
