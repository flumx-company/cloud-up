import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MainStatusComponent} from "./component/main-status.component";
import {
    DxButtonModule,
    DxDataGridModule,
    DxFormModule,
    DxPopupModule,
    DxSelectBoxModule, DxSwitchModule,
    DxTextBoxModule
} from "devextreme-angular";
import {CommonModule} from "@angular/common";


const routes: Routes = [
    {path: '',            component: MainStatusComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        DxSelectBoxModule,
        DxTextBoxModule,
        DxFormModule,
        DxPopupModule,
        DxPopupModule,
        CommonModule,
        DxSwitchModule,
        DxButtonModule,
        DxDataGridModule
    ],
    declarations: [
        MainStatusComponent
    ],
    exports: [RouterModule],
    providers: []
})

export class StatusConfigModule {
}
