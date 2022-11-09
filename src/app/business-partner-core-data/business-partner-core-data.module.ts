import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';

import {BusinessPartnerRoutingModule} from './business-partner-routing.module';
import {BusinessPartnerCoreDataCreateComponent, BusinessPartnerCoreDataFormComponent, BusinessPartnerCoreDataHomeComponent, BusinessPartnerCoreDataUpdateComponent} from './components';
import {AccountingSystemService} from './services/accounting-system.service';
import {BusinessPartnerCoreDataService} from './services/business-partner-core-data.service';
import {BusinessPartnerSharedFormComponent} from './shared';

@NgModule({
  imports: [SharedModule, BusinessPartnerRoutingModule],
  declarations: [
    BusinessPartnerCoreDataHomeComponent, BusinessPartnerCoreDataFormComponent,
    BusinessPartnerCoreDataCreateComponent,
    BusinessPartnerCoreDataUpdateComponent, BusinessPartnerSharedFormComponent
  ],
  exports: [BusinessPartnerCoreDataHomeComponent],
  providers: [BusinessPartnerCoreDataService, AccountingSystemService]
})
export class BusinessPartnerCoreDataModule {
}
