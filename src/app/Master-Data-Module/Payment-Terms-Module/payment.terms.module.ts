import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {DxButtonModule} from 'devextreme-angular/ui/button';
import {DxDataGridModule} from 'devextreme-angular/ui/data-grid';
import {DxTextBoxModule} from 'devextreme-angular/ui/text-box';
import {DxSelectBoxModule} from 'devextreme-angular/ui/select-box';


import {PaymentTermsService} from "./service/payment-terms.service";
import {PaymentTermsComponent} from "./component/payment-terms.component";
import {LogicalSystemService} from "../../Configuration-Module/Technical-Configuration-Module/Logical-System-Module/service/logical-system.service";



const routes: Routes = [
  { path: '', component: PaymentTermsComponent },
];

@NgModule({
  imports: [
      CommonModule,
      DxButtonModule,
      DxDataGridModule,
      DxTextBoxModule,
      DxSelectBoxModule,
      RouterModule.forChild(routes)
  ],
  declarations: [
      PaymentTermsComponent
  ],
  providers: [PaymentTermsService, LogicalSystemService],
  exports: [],
})
export class PaymentTermsModule {
}
