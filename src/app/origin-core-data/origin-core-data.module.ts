import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DxAccordionModule, DxButtonModule, DxDataGridModule, DxDropDownBoxModule, DxFormModule, DxPopupModule, DxSelectBoxModule, DxSwitchModule} from 'devextreme-angular';

import {ConfigService} from '../shared/services/config.service';

import {ForeignCurrencyInformationConfigurationComponent} from './components/foreign-currency-information-configuration/foreign-currency-information-configuration.component';
import {ImportReasonCodeComponent} from './components/import-reason-code/import-reason-code.component';
import {OptimizationConfigurationComponent} from './components/optimization-configuration/optimization-configuration.component';
import {OriginCoreDataHomeComponent} from './components/origin-core-data-home/origin-core-data-home.component';
import {OriginDetailComponent} from './components/origin-detail/origin-detail.component';
import {OriginGroupDetailOriginsComponent} from './components/origin-group-detail-origins/origin-group-detail-origins.component';
import {OriginGroupDetailComponent} from './components/origin-group-detail/origin-group-detail.component';
import {ReplaceTechnicalNamePipe} from './pipes/replace-technical-name.pipe';
import {AccountingSystemService} from './services/accounting-system.service';
import {OriginGroupService} from './services/origin-group.service';
import {OriginService} from './services/origin.service';
import {ProfileSequenceService} from './services/profile-sequence.service';
import { CharacteristicComponent } from './components/characteristic/characteristic.component';

@NgModule({
  imports: [
    CommonModule, RouterModule, DxDataGridModule, DxButtonModule, DxFormModule,
    DxSelectBoxModule, DxSwitchModule, DxAccordionModule, DxPopupModule,
    DxDropDownBoxModule
  ],
  declarations: [
    OriginCoreDataHomeComponent,
    OriginDetailComponent,
    OriginGroupDetailComponent,
    ReplaceTechnicalNamePipe,
    OriginGroupDetailOriginsComponent,
    OptimizationConfigurationComponent,
    ImportReasonCodeComponent,
    ForeignCurrencyInformationConfigurationComponent,
    CharacteristicComponent,
  ],
  exports: [OriginCoreDataHomeComponent],
  providers: [
    ConfigService, OriginService, OriginGroupService, AccountingSystemService,
    ProfileSequenceService
  ]
})
export class OriginCoreDataModule {
}
