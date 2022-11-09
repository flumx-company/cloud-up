import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {InvoiceGatewayComponent} from "./component/invoice-gateway.component";




const routes: Routes = [
    {path: '', component: InvoiceGatewayComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [
        InvoiceGatewayComponent
    ],
    exports: [RouterModule],
    providers: []
})

export class InvoiceGatewayModule {}
