import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {RouterModule} from "@angular/router";
import {DashboardRulebookComponent} from "./_component/dashboard-rulebook.component";

import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {DxCheckBoxModule} from 'devextreme-angular/ui/check-box';
import {DxDataGridModule} from 'devextreme-angular/ui/data-grid';
import {DxDropDownBoxModule} from 'devextreme-angular/ui/drop-down-box';
import {DxPopupModule} from 'devextreme-angular/ui/popup';
import {DxSelectBoxModule} from 'devextreme-angular/ui/select-box';
import {DxTextBoxModule} from 'devextreme-angular/ui/text-box';
import {DxAccordionModule} from 'devextreme-angular/ui/accordion';
import {DxTreeViewModule} from 'devextreme-angular/ui/tree-view';
import {DxValidatorModule} from 'devextreme-angular/ui/validator';

const routes: any = [
    {
        path:'', component: DashboardRulebookComponent
    },
    {
        path: 'profile',
        loadChildren: './Profile-Module/profile.module#ProfileModule'
    },
    {
        path: 'profile-sequence',
        loadChildren: './Profile-Sequence-Module/profile.sequence.module#ProfileSequenceModule'
    }
];

@NgModule({
    imports: [
        CommonModule,
        DxSelectBoxModule,
        DxAccordionModule,
        DxTextBoxModule,
        SharedModule,
        DxDataGridModule,
        DxCheckBoxModule,
        ReactiveFormsModule,
        FormsModule,
        DxDropDownBoxModule,
        DxValidatorModule,
        DxTreeViewModule,
        DxPopupModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        DashboardRulebookComponent,
    ],
    providers: [
    ]
})
export class ProfileManagerModule {
}
