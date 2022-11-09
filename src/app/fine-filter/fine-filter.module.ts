import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DxAccordionModule, DxButtonModule, DxDataGridModule, DxFormModule, DxNumberBoxModule, DxPopupModule, DxSelectBoxModule, DxSwitchModule, DxTextBoxModule} from 'devextreme-angular';

import {SharedModule} from '../shared/shared.module';

import {DetailMatchFieldsAreaComponent, DetailSearchAreaComponent, DetailValidationAreaComponent, FineFilterDetailComponent, FineFilterHomeComponent, FineFilterUsageInfoComponent} from './components';
import {ReplaceUndefinedPipe} from './pipes/replace-undefined.pipe';
import {FineFilterService} from './services/fine-filter.service';
import {RestrictionService} from './services/restriction.service';

@NgModule({
  imports: [
    CommonModule, DxDataGridModule, DxSwitchModule, DxAccordionModule,
    DxButtonModule, DxPopupModule, DxFormModule, DxSelectBoxModule,
    DxTextBoxModule, SharedModule, DxNumberBoxModule
  ],
  declarations: [
    FineFilterHomeComponent, ReplaceUndefinedPipe, FineFilterDetailComponent,
    DetailSearchAreaComponent, DetailValidationAreaComponent,
    DetailMatchFieldsAreaComponent, FineFilterUsageInfoComponent
  ],
  providers: [FineFilterService, RestrictionService]
})
export class FineFilterModule {
}
