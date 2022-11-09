import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {DxAccordionModule} from 'devextreme-angular/ui/accordion';
import {DxListModule} from 'devextreme-angular/ui/list';
import {DxDataGridModule} from 'devextreme-angular/ui/data-grid';
import {DxSwitchModule} from 'devextreme-angular/ui/switch';

import {LogicalSystemComponent} from "./component/logical-system.component";
import {LogicalSystemService} from "./service/logical-system.service";

const routes: Routes = [
    { path: '',  component: LogicalSystemComponent},
];

@NgModule({
    imports: [
        CommonModule,
        DxDataGridModule,
        DxAccordionModule,
        DxListModule,
        DxSwitchModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        LogicalSystemComponent
    ],
    providers: [LogicalSystemService]
})

export class LogicalSystemModule {}
