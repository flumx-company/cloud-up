import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {confirm} from 'devextreme/ui/dialog';
import {isNullOrUndefined} from 'util';

import {InfoPopupComponent} from '../../../shared/components/info-popup/info-popup.component';
import {DirtyCheck} from '../../../shared/helpers/dirty-check';
import {MessageToast} from '../../../shared/helpers/message-toast';
import {AccountTypeList} from '../../models/account-type-list';
import {AccountingSystem} from '../../models/accounting-system';
import {BusinessPartner} from '../../models/business-partner';
import {AccountingSystemService} from '../../services/accounting-system.service';
import {BusinessPartnerCoreDataService} from '../../services/business-partner-core-data.service';

@Component({
  selector: 'app-business-partner-core-data-update',
  templateUrl: './business-partner-core-data-update.component.html',
  styleUrls: ['./business-partner-core-data-update.component.css']
})
export class BusinessPartnerCoreDataUpdateComponent implements OnInit {
  @ViewChild(InfoPopupComponent) infoPopup: InfoPopupComponent|undefined;
  businessPartner: BusinessPartner = new BusinessPartner();
  backupBusinessPartner = '';

  accountingSystemList: AccountingSystem[] = [];

  constructor(
      private router: Router, private route: ActivatedRoute,
      private service: BusinessPartnerCoreDataService,
      private accountingSystemService: AccountingSystemService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.service.getById(params['id'])
          .subscribe(
              res => {
                this.businessPartner = res;
                if (!isNullOrUndefined(this.businessPartner.accountType)) {
                  this.businessPartner.matchField =
                      this.businessPartner.accountType;
                }

                this.backupBusinessPartner =
                    DirtyCheck.getStringFromStringOrObject(
                        this.businessPartner);

                this.accountingSystemService.readAllAccountingSystems()
                    .subscribe(
                        result => (this.accountingSystemList = result),
                        error => {
                          if (error.status !== 404) {
                            MessageToast.showError(error.message);
                          } else {
                            this.accountingSystemList = [];
                          }
                        });
              },
              error => {
                MessageToast.showError(error.message);
              });
    });
  }

  showInfo() {
    if (this.infoPopup) {
      this.infoPopup.showInfoForObject(this.businessPartner);
    }
  }

  // tslint:disable-next-line:no-any
  onSubmitForm(e: any) {
    if (!DirtyCheck.isDirty(this.businessPartner, this.backupBusinessPartner)) {
      this.router.navigate(['business-partner-core-data']);
      return;
    }

    const partner = JSON.parse(JSON.stringify(this.businessPartner));
    if (!isNullOrUndefined(AccountTypeList.list.find(
            type => type.technicalName === partner.matchField))) {
      partner.accountType = partner.matchField;
      partner.matchField = 'ACCOUNT';
    } else {
      partner.accountType = null;
    }

    this.service.isDuplicate(partner).subscribe(res => {
      if (res) {
        MessageToast.showError(
            'Sender Information with these values already exists!');
      } else {
        this.service.update(partner).subscribe(
            res => this.router.navigate(['/business-partner-core-data']),
            error => MessageToast.showError(error.message));
      }
    });
  }

  navBack() {
    if (!DirtyCheck.isDirty(this.businessPartner, this.backupBusinessPartner)) {
      this.router.navigate(['business-partner-core-data']);
      return;
    }

    const result = confirm('Continue without saving?', '');
    result.then(res => {
      if (res) {
        this.router.navigate(['business-partner-core-data']);
      }
    });
  }
}
