import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {DxFormModule} from 'devextreme-angular/ui/form';
import {DxPopupModule} from 'devextreme-angular/ui/popup';
import {DxSelectBoxModule} from 'devextreme-angular/ui/select-box';
import {DxTextBoxModule} from 'devextreme-angular/ui/text-box';
import {SharedModule} from '../../../shared/shared.module';


import {ConditionService} from './_service/condition.service';
import {FieldConfigService} from './_service/field-config.service';

import {
    ConditionDetailComponent,
    ConditionsHomeComponent
} from './components';

const routes: Routes = [
    {path: '',                   component: ConditionsHomeComponent},
    {path: 'detail/:mode',       component: ConditionDetailComponent},
    {path: 'detail/:mode/:name', component: ConditionDetailComponent},
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        DxSelectBoxModule,
        DxTextBoxModule,
        DxFormModule,
        DxPopupModule,
    ],
    declarations: [
        ConditionsHomeComponent,
        ConditionDetailComponent,
    ],
    exports: [ConditionsHomeComponent],
    providers: [
        ConditionService,
        FieldConfigService
    ]
})
export class ConditionsModule {
}
