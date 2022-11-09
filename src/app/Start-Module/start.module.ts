import {NgModule}                     from '@angular/core';
import {RouterModule, Routes}         from "@angular/router";
import {DashboardStartComponent} from "./component/dashboard-start.component";
import {DashboardModule} from "../dashboard/dashboard.module";



const routes: Routes = [
    {
        path: '', component   :       DashboardStartComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        DashboardModule
    ],
    declarations: [
        DashboardStartComponent,
    ],
    exports: [],
    providers: []
})

export class StartModule {}
