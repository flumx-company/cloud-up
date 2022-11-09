import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {DxAccordionModule} from 'devextreme-angular/ui/accordion';
import {DxListModule} from 'devextreme-angular/ui/list';
import {DxDataGridModule} from 'devextreme-angular/ui/data-grid';

import {SharedModule} from '../../../shared/shared.module';

import {RecordTypeService} from "./_service/record.type.service";
import {RecordTypeHomeComponent} from "./component/home/record-type-home.component";
import {RecordTypeDetailComponent} from "./component/detail/record-type-detail.component";
import {DetailScreenFieldConfigService} from "../detail-screen-field-config-module/_service/detail-screen-field-config.service";

const routes: Routes = [
    { path: '', component: RecordTypeHomeComponent },
    { path: ':mode', component: RecordTypeDetailComponent },
    { path: ':mode/:index', component: RecordTypeDetailComponent },
];

@NgModule({
    imports: [
        CommonModule,
        DxDataGridModule,
        SharedModule,
        DxAccordionModule,
        DxListModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        RecordTypeHomeComponent,
        RecordTypeDetailComponent
    ],
    exports: [],
    providers: [RecordTypeService, DetailScreenFieldConfigService]
})
export class RecordTypeModule {}
