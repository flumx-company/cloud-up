import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DxCheckBoxModule} from 'devextreme-angular/ui/check-box';
import {DxDataGridModule} from 'devextreme-angular/ui/data-grid';
import {DxDropDownBoxModule} from 'devextreme-angular/ui/drop-down-box';
import {DxPopupModule} from 'devextreme-angular/ui/popup';
import {DxSelectBoxModule} from 'devextreme-angular/ui/select-box';
import {DxTextBoxModule} from 'devextreme-angular/ui/text-box';
import {DxAccordionModule} from 'devextreme-angular/ui/accordion';
import {DxTreeViewModule} from 'devextreme-angular/ui/tree-view';
import {DxValidatorModule} from 'devextreme-angular/ui/validator';

import {SharedModule} from '../../../shared/shared.module';
import {DetailScreenFieldConfigComponent} from "./_component/detail-screen-field-config.component";
import {DetailScreenFieldConfigService} from "./_service/detail-screen-field-config.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {OvsConfigComponent} from "./other/ovs/ovs-config.component";
import {DxScrollViewModule} from "devextreme-angular";

const routes: Routes = [
    {path: '', component: DetailScreenFieldConfigComponent},
];

@NgModule({
    imports: [
        DxSelectBoxModule,
        DxAccordionModule,
        DxTextBoxModule,
        SharedModule,
        DxDataGridModule,
        DxCheckBoxModule,
        ReactiveFormsModule,
        FormsModule,
        DxDropDownBoxModule,
        DxTreeViewModule,
        DxPopupModule,
        RouterModule.forChild(routes),
        DxValidatorModule,
        CommonModule,
        DxScrollViewModule
    ],
    providers: [DetailScreenFieldConfigService],
    declarations: [DetailScreenFieldConfigComponent,OvsConfigComponent],
    entryComponents:[OvsConfigComponent]
})

export class DetailScreenFieldConfigModule {
}
