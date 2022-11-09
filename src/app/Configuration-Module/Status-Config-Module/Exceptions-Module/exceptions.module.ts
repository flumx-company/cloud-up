import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {DxButtonModule} from 'devextreme-angular/ui/button';
import {DxDataGridModule} from 'devextreme-angular/ui/data-grid';
import {DxTextBoxModule} from 'devextreme-angular/ui/text-box';
import {DxFormModule} from 'devextreme-angular/ui/form';
import {DxPopupModule} from 'devextreme-angular/ui/popup';
import {DxSelectBoxModule} from 'devextreme-angular/ui/select-box';
import {DxValidatorModule} from 'devextreme-angular/ui/validator';

import {SharedModule} from '../../../shared/shared.module';

import {ExceptionService} from "./service/exceptions.service";
import {ExceptionComponent} from "./component/exceptions.component";

const routes: Routes = [
    {path: '',            component: ExceptionComponent},
];

@NgModule({
  imports: [
      CommonModule,
      DxButtonModule,
      DxDataGridModule,
      SharedModule,
      DxTextBoxModule,
      DxFormModule,
      DxPopupModule,
      DxSelectBoxModule,
      DxValidatorModule,
      RouterModule.forChild(routes)
  ],
  declarations: [ExceptionComponent],
  providers: [ExceptionService],
  exports: [],
})

export class ExceptionModule { }
