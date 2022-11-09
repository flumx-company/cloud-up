import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {confirm} from 'devextreme/ui/dialog';
import {isNullOrUndefined} from 'util';

import {MessageToast} from '../../../shared/helpers/message-toast';
import {InsertMetaData} from '../../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../../shared/models/update-meta-data';
import {AccountTypeList} from '../../models/account-type-list';
import {AccountingSystem} from '../../models/accounting-system';
import {BusinessPartner} from '../../models/business-partner';
import {AccountingSystemService} from '../../services/accounting-system.service';
import {BusinessPartnerCoreDataService} from '../../services/business-partner-core-data.service';

@Component({
  selector: 'app-business-partner-core-data-create',
  templateUrl: './business-partner-core-data-create.component.html',
  styleUrls: ['./business-partner-core-data-create.component.css']
})
export class BusinessPartnerCoreDataCreateComponent implements OnInit {
  businessPartner: BusinessPartner = new BusinessPartner({
    insertMetadata: new InsertMetaData(),
    updateMetadata: new UpdateMetaData()
  });

  accountingSystemList: AccountingSystem[] = [];

  constructor(
      private router: Router, private route: ActivatedRoute,
      private service: BusinessPartnerCoreDataService,
      private accountingSystemService: AccountingSystemService) {}

  ngOnInit() {
    this.route.url.subscribe(url => {
      if (url[0].path === 'create') {
        this.accountingSystemService.readAllAccountingSystems().subscribe(
            result => (this.accountingSystemList = result), error => {
              if (error.status !== 404) {
                MessageToast.showError(error.message);
              }
              this.accountingSystemList = [];
            });
      }
    });
  }

  // tslint:disable-next-line:no-any
  onSubmitForm(e: any) {
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
        this.service.insert(partner).subscribe(
            res => this.router.navigate(['/business-partner-core-data']),
            error => MessageToast.showError(error.message));
      }
    });
  }

  navBack() {
    const result = confirm('Continue without saving?', '');
    result.then(res => {
      if (res) {
        this.router.navigate(['business-partner-core-data']);
      }
    });
  }
}
