import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ApprovalsComponent} from "./component/approvals.component";



const routes: Routes = [
    {path: '', component: ApprovalsComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [
        ApprovalsComponent
    ],
    exports: [RouterModule],
    providers: []
})

export class ApprovalsModule {}
