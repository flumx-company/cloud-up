import {NgModule}                     from '@angular/core';
import {RouterModule, Routes}         from "@angular/router";
import {sapUi5} from "./component/sapui5-open.component";
import {DashboardModule} from "../../dashboard/dashboard.module";



const routes: Routes = [
    {
        path: '', component   :       sapUi5
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        DashboardModule
    ],
    declarations: [
        sapUi5,
    ],
    exports: [],
    providers: []
})

export class SapModule {}
