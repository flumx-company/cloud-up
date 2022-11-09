import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DxButtonModule, DxDataGridModule, DxSwitchModule,} from 'devextreme-angular';

import {SharedModule} from '../shared/shared.module';

import {AccountingSystemCoreDataDetailComponent, AccountingSystemCoreDataHomeComponent} from './components';
import {AccountingSystemCoreDataService} from './services/accounting-system-core-data.service';
import {AmountTypeService} from './services/amount-type.service';

@NgModule({
  declarations: [
    AccountingSystemCoreDataHomeComponent,
    AccountingSystemCoreDataDetailComponent
  ],
  imports: [
    CommonModule, RouterModule, DxDataGridModule, DxSwitchModule,
    DxButtonModule, SharedModule
  ],
  exports: [AccountingSystemCoreDataHomeComponent],
  providers: [AccountingSystemCoreDataService, AmountTypeService]
})
export class AccountingSystemCoreDataModule {
}
