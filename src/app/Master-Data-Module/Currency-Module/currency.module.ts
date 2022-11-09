import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DxButtonModule, DxDataGridModule, DxTextBoxModule, DxFormModule, DxPopupModule} from 'devextreme-angular';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule, Routes} from "@angular/router";

import {CurrencyService} from "./_service/currency.service";
import {CurrencyComponent} from "./component/home/currency.component";
import {CurrencyDetailComponent} from "./component/detail/currency.component";

const routes: Routes = [
  { path: '', component: CurrencyComponent },
  { path: ':mode/:index', component: CurrencyDetailComponent },
  { path: ':mode', component: CurrencyDetailComponent },
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
      RouterModule.forChild(routes)
  ],
  declarations: [
      CurrencyComponent,
      CurrencyDetailComponent
  ],
  providers: [CurrencyService],
  exports: [],
})
export class CurrencyModule {
}
