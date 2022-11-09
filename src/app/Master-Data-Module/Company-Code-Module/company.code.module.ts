import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import {DxFormModule} from "devextreme-angular/ui/form";
import {DxPopupModule} from "devextreme-angular/ui/popup";
import {DxSelectBoxModule} from "devextreme-angular/ui/select-box";
import {DxTextBoxModule} from "devextreme-angular/ui/text-box";
import {DxDataGridModule} from "devextreme-angular/ui/data-grid";
import {DxButtonModule} from "devextreme-angular/ui/button";

import {CompanyCodeService} from "./_service/company-code.service";

import {CompanyCodeDetailComponent} from "./_component/detail/company-code-detail.component";
import {CompanyCodeComponent} from "./_component/home/company-code.component";
import {CurrencyService} from "../Currency-Module/_service/currency.service";

const routes: Routes = [
    { path: '', component: CompanyCodeComponent },
    { path: ':mode', component: CompanyCodeDetailComponent },
    { path: ':mode/:index', component: CompanyCodeDetailComponent },
];

@NgModule({
    imports: [
        DxSelectBoxModule,
        DxTextBoxModule,
        DxFormModule,
        DxPopupModule,
        DxPopupModule,
        CommonModule,
        DxButtonModule,
        DxDataGridModule,
        RouterModule.forChild(routes)
    ],
    declarations:[
        CompanyCodeComponent,
        CompanyCodeDetailComponent
    ],
    providers:[
        CompanyCodeService,
        CurrencyService
    ]
})
export class CompanyCodeModule {
}
