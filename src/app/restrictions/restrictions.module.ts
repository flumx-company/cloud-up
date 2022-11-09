import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DxButtonModule, DxDataGridModule, DxFormModule, DxPopupModule, DxSelectBoxModule, DxSwitchModule, DxTextBoxModule} from 'devextreme-angular';

import {RestrictionDetailComponent} from './components/restriction-detail/restriction-detail.component';
import {RestrictionHomeComponent} from './components/restriction-home/restriction-home.component';
import {RestrictionUsageInfoComponent} from './components/restriction-usage-info/restriction-usage-info.component';
import {FineFilterService} from './services/fine-filter.service';
import {RestrictionService} from './services/restriction.service';

@NgModule({
  imports: [
    CommonModule, DxDataGridModule, DxButtonModule, DxPopupModule,
    DxSwitchModule, DxFormModule, DxSelectBoxModule, DxTextBoxModule
  ],
  declarations: [
    RestrictionHomeComponent, RestrictionDetailComponent,
    RestrictionUsageInfoComponent
  ],
  providers: [RestrictionService, FineFilterService]
})
export class RestrictionsModule {
}
