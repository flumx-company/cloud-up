import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from '../../../shared/shared.module';

import {DxDropDownBoxModule} from 'devextreme-angular/ui/drop-down-box';
import {DxFormModule} from 'devextreme-angular/ui/form';
import {DxPopupModule} from 'devextreme-angular/ui/popup';
import {DxSelectBoxModule} from 'devextreme-angular/ui/select-box';
import {DxValidatorModule} from 'devextreme-angular/ui/validator';
import {DxTextBoxModule} from 'devextreme-angular/ui/text-box';
import {DxTreeViewModule} from 'devextreme-angular/ui/tree-view';

import {AgentResolutionHomeComponent, AgentResolutionDetailComponent} from './components';
import {ReplaceFormatTypePipe} from './pipes/replace-format-type.pipe';
import {AgentResolutionRuleService} from './services/agent-resolution-rule.service';
import {FieldConfigService} from './services/field-config.service';
import {ConditionService} from "../../Technical-Configuration-Module/Conditions-module/_service/condition.service";
import {RecordTypeService} from "../../Field-Configuration-Module/record-type-module/_service/record.type.service";


const routes: Routes = [
      { path: '',                component: AgentResolutionHomeComponent   },
      { path: ':mode',           component: AgentResolutionDetailComponent },
      { path: ':mode/:index',    component: AgentResolutionDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxFormModule,
    DxPopupModule,
    DxTreeViewModule,
    DxValidatorModule,
    DxDropDownBoxModule
  ],
  declarations: [
    AgentResolutionHomeComponent,
    AgentResolutionDetailComponent,
    ReplaceFormatTypePipe
  ],
  exports: [],
  providers: [
    AgentResolutionRuleService,
    FieldConfigService,
    ConditionService,
    RecordTypeService
  ]
})
export class AgentResolutionRuleModule {
}
