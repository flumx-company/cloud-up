import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {DxAccordionModule} from 'devextreme-angular/ui/accordion';
import {DxDropDownBoxModule} from 'devextreme-angular/ui/drop-down-box';
import {DxFormModule} from 'devextreme-angular/ui/form';
import {DxPopupModule} from 'devextreme-angular/ui/popup';
import {DxSelectBoxModule} from 'devextreme-angular/ui/select-box';
import {DxTextBoxModule} from 'devextreme-angular/ui/text-box';
import {SharedModule} from '../../../shared/shared.module';

import {SearchVariantComponent} from "./component/search-variant.component";

import {SearchVariantService} from "./_service/search.variant.service";
import {DetailScreenFieldConfigService} from "../detail-screen-field-config-module/_service/detail-screen-field-config.service";

const routes: Routes = [
    { path: '',  component: SearchVariantComponent },
];

@NgModule({
  imports: [
      CommonModule,
      SharedModule,
      DxSelectBoxModule,
      DxTextBoxModule,
      DxFormModule,
      DxPopupModule,
      DxAccordionModule,
      DxDropDownBoxModule,
      RouterModule.forChild(routes)
  ],
  declarations: [
      SearchVariantComponent
  ],
  exports: [],
  providers: [
      SearchVariantService,
      DetailScreenFieldConfigService
  ]
})
export class SearchVariantModule {}
