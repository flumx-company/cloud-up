import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {RouterModule} from "@angular/router";
import {ProfileSequenceHomeComponent} from "./profile-sequence-home/profile-sequence-home.component";
import {ProfileSequenceDetailComponent} from "./profile-sequence-detail/profile-sequence-detail.component";
import {ProfileSequenceUsageInfoComponent} from "./profile-sequence-usage-info/profile-sequence-usage-info.component";
import {DxCheckBoxModule} from 'devextreme-angular/ui/check-box';
import {DxDataGridModule} from 'devextreme-angular/ui/data-grid';
import {DxDropDownBoxModule} from 'devextreme-angular/ui/drop-down-box';
import {DxPopupModule} from 'devextreme-angular/ui/popup';
import {DxSelectBoxModule} from 'devextreme-angular/ui/select-box';
import {DxTextBoxModule} from 'devextreme-angular/ui/text-box';
import {DxAccordionModule} from 'devextreme-angular/ui/accordion';
import {DxTreeViewModule} from 'devextreme-angular/ui/tree-view';
import {DxValidatorModule} from 'devextreme-angular/ui/validator';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    FunctionMatchAdviceComponent,
    FunctionMatchAmountComponent,
    FunctionSelectOpenItemComponent,
    ProcessingFunctionComponent
} from "../other-components";
import {RemoteConfigurationComponent} from "../other-components/remote-configuration/remote-configuration.component";
import {ConditionService, OriginGroupService, OriginService, ProfileSequenceService, ProfileService} from "../services";
import {ProfileServiceModule} from "../profile.service.module";
import {ProfileOtherModule} from "../profile.other.module";

const routes: any = [
    { path: '', component: ProfileSequenceHomeComponent },
    { path: 'add', component: ProfileSequenceDetailComponent },
    { path: 'edit/:name', component: ProfileSequenceDetailComponent },
    { path: 'usageInfo/:name', component: ProfileSequenceUsageInfoComponent }
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
        ProfileServiceModule,
        ProfileOtherModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ProfileSequenceDetailComponent,
        ProfileSequenceHomeComponent,
        ProfileSequenceUsageInfoComponent,
    ],
})
export class ProfileSequenceModule {}
