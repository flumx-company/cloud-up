import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {DxAccordionModule} from 'devextreme-angular/ui/accordion';
import {DxListModule} from 'devextreme-angular/ui/list';
import {DxDataGridModule} from 'devextreme-angular/ui/data-grid';

import {SharedModule} from '../../../shared/shared.module';

import {SourceService} from "./_service/source.service";
import {SourceComponent} from "./component/home/source-value.component";
import {SourceDetailComponent} from "./component/detail/source-value-detail.component";
import {DetailScreenFieldConfigService} from "../detail-screen-field-config-module/_service/detail-screen-field-config.service";

const routes: Routes = [
    { path: '', component: SourceComponent },
    { path: ':mode', component: SourceDetailComponent },
    { path: ':mode/:index', component: SourceDetailComponent },
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
        SourceComponent,
        SourceDetailComponent
    ],
    exports: [],
    providers: [SourceService,DetailScreenFieldConfigService]
})
export class SourceModule {}
