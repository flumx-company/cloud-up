import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {DxButtonModule} from 'devextreme-angular/ui/button';
import {DxDataGridModule} from 'devextreme-angular/ui/data-grid';
import {DxTextBoxModule} from 'devextreme-angular/ui/text-box';
import {DxSelectBoxModule} from 'devextreme-angular/ui/select-box';

import {RouterModule, Routes} from "@angular/router";
import {PaymentTermsService} from "./service/payment-terms.service";
import {LogicalSystemService} from "../../Configuration-Module/Technical-Configuration-Module/Logical-System-Module/service/logical-system.service";
import {PaymentsMethodsComponent} from "./component/payments-methods.component";


const routes: Routes = [
    {path: '', component: PaymentsMethodsComponent},
];

@NgModule({
    imports: [
        CommonModule,
        DxButtonModule,
        DxDataGridModule,
        DxTextBoxModule,
        DxSelectBoxModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        PaymentsMethodsComponent
    ],
    providers: [
        PaymentTermsService,
        LogicalSystemService
    ],
    exports: [],
})
export class PaymentMethodsModule {
}
