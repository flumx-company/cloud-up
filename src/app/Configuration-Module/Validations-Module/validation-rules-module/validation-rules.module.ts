import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../../shared/shared.module";

import { DxButtonModule }    from 'devextreme-angular/ui/button';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxTextBoxModule }   from 'devextreme-angular/ui/text-box';
import { DxPopupModule }     from 'devextreme-angular/ui/popup';
import { DxFormModule }      from 'devextreme-angular/ui/form';
import { DxDataGridModule }  from 'devextreme-angular/ui/data-grid';

import { ValidationRulesService } from "./services/validation-rules.service";

import { ValidationRulesHomeComponent } from "./components/home/validation-rules-home.component";
import { ValidationRulesDetailComponent } from "./components/detail/validation-rules-detail.component";
import { RecordTypeService } from "../../Field-Configuration-Module/record-type-module/_service/record.type.service";
import { DetailScreenFieldConfigService } from "../../Field-Configuration-Module/detail-screen-field-config-module/_service/detail-screen-field-config.service";
import {ValidationRulesDetailNewComponent} from "./components/new-document/validation-rules-detail-new.component";

const routes: Routes = [
    {path: '',          component: ValidationRulesHomeComponent},
    {path: ':mode',     component: ValidationRulesDetailComponent},
    {path: ':mode/:id', component: ValidationRulesDetailComponent},
    {path: 'new',       component: ValidationRulesDetailNewComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        DxButtonModule,
        DxDataGridModule,
        SharedModule,
        DxSelectBoxModule,
        DxTextBoxModule,
        DxFormModule,
        DxPopupModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        ValidationRulesHomeComponent,
        ValidationRulesDetailComponent,
        ValidationRulesDetailNewComponent
    ],
    providers: [
        ValidationRulesService,
        RecordTypeService,
        DetailScreenFieldConfigService
    ],
})

export class ValidationRulesModule {
}
