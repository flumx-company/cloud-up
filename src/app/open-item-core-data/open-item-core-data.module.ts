import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
// tslint:disable-next-line:max-line-length
import {
  DxAccordionModule,
  DxButtonModule,
  DxCheckBoxModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxDropDownBoxModule,
  DxFormModule,
  DxListModule,
  DxSelectBoxModule,
  DxTextAreaModule,
  DxTreeViewModule
} from 'devextreme-angular';

import {OpenItemCoreDataEditComponent} from './components/open-item-core-data-edit/open-item-core-data-edit.component';
import {OpenItemCoreDataHomeComponent} from './components/open-item-core-data-home/open-item-core-data-home.component';
import {OpenItemCoreDataService} from './services/open-item-core-data.service';
import {AccountingSystemService} from "../shared/services/accounting-system.service";

@NgModule({
  declarations: [
    OpenItemCoreDataHomeComponent,
    OpenItemCoreDataEditComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    DxButtonModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxFormModule,
    DxListModule,
    DxDropDownBoxModule,
    DxTreeViewModule,
    DxDataGridModule,
    DxAccordionModule,
    DxCheckBoxModule,
    RouterModule,
  ],
  exports: [
    OpenItemCoreDataHomeComponent,
    OpenItemCoreDataEditComponent
  ],
  providers: [
    OpenItemCoreDataService,
    AccountingSystemService
  ]
})
export class OpenItemCoreDataModule {
}
