import {NgModule}                     from '@angular/core';
import {RouterModule, Routes}         from "@angular/router";

import {DashboardMasterDataComponent} from "./_component/dashboard-master-data.component";

const routes: Routes = [
    {
        path: '',
        children: [
            {path: '',                component   :       DashboardMasterDataComponent },
            {
                path: 'company-code',
                loadChildren: './Company-Code-Module/company.code.module#CompanyCodeModule'
            },
            {
                path: 'currency',
                loadChildren: './Currency-Module/currency.module#CurrencyModule'
            },
            {
                path: 'pay-terms',
                loadChildren: './Payment-Terms-Module/payment.terms.module#PaymentTermsModule'
            },
            {
                path: 'pay-methods',
                loadChildren: './Payments-Methods-Module/payment.methods.module#PaymentMethodsModule'
            },
            {
                path: 'vendors',
                loadChildren: './Vendors-Module/vendors.module#VendorsModule'
            },
        ]
    },
];
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [
        DashboardMasterDataComponent
    ],
    exports: [],
    providers: []
})

export class MasterDataModule {}
