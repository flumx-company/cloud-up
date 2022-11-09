import {NgModule}                     from '@angular/core';
import {RouterModule, Routes}         from "@angular/router";
import {ReportingComponent}           from "./component/reporting.component";
import {DxChartModule}                from "devextreme-angular/ui/chart";
import { DxPieChartModule}            from "devextreme-angular/ui/pie-chart";


const routes: Routes = [
    {
        path: '', component : ReportingComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        DxChartModule,
        DxPieChartModule
    ],
    declarations: [
        ReportingComponent
    ],
    exports: [],
    providers: []
})

export class ReportingModule {}
