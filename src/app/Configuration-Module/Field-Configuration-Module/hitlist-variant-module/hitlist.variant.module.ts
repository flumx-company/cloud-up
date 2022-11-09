import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";

import {DxCheckBoxModule} from 'devextreme-angular/ui/check-box';
import {DxDataGridModule} from 'devextreme-angular/ui/data-grid';
import {DxDropDownBoxModule} from 'devextreme-angular/ui/drop-down-box';
import {DxPopupModule} from 'devextreme-angular/ui/popup';
import {DxSelectBoxModule} from 'devextreme-angular/ui/select-box';
import {DxTextBoxModule} from 'devextreme-angular/ui/text-box';
import {DxAccordionModule} from 'devextreme-angular/ui/accordion';
import {DxTreeViewModule} from 'devextreme-angular/ui/tree-view';
import {DxValidatorModule} from 'devextreme-angular/ui/validator';

import {SharedModule} from "../../../shared/shared.module";

import {HitlistVariantComponent} from "./component/hitlist-variant.component";

import {HitlistVariantService} from "./_service/hitlist.variant.service";
import {DetailScreenFieldConfigService} from "../detail-screen-field-config-module/_service/detail-screen-field-config.service";

const routes: Routes = [
    { path: '',  component: HitlistVariantComponent },
];

@NgModule({
  imports: [
      CommonModule,
      DxSelectBoxModule,
      DxAccordionModule,
      DxTextBoxModule,
      DxCheckBoxModule,
      SharedModule,
      DxDataGridModule,
      ReactiveFormsModule,
      FormsModule,
      DxDropDownBoxModule,
      DxTreeViewModule,
      DxPopupModule,
      DxValidatorModule,RouterModule.forChild(routes),
  ],
  declarations: [
      HitlistVariantComponent
  ],
  exports: [],
  providers: [
      HitlistVariantService,
      DetailScreenFieldConfigService
  ]
})
export class HitlistVariantModule {}
