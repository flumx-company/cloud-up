import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {ProfileHomeComponent} from "./profile-home/profile-home.component";
import {ProfileDetailComponent} from "./profile-detail/profile-detail.component";
import {ProfileUsageInfoComponent} from "./profile-usage-info/profile-usage-info.component";

import {DxCheckBoxModule} from 'devextreme-angular/ui/check-box';
import {DxDataGridModule} from 'devextreme-angular/ui/data-grid';
import {DxDropDownBoxModule} from 'devextreme-angular/ui/drop-down-box';
import {DxSelectBoxModule} from 'devextreme-angular/ui/select-box';
import {DxTextBoxModule} from 'devextreme-angular/ui/text-box';
import {DxAccordionModule} from 'devextreme-angular/ui/accordion';
import {DxFormModule} from 'devextreme-angular/ui/form';
import {DxButtonModule} from 'devextreme-angular/ui/button';
import {DxSwitchModule} from 'devextreme-angular/ui/switch';


import {
    FunctionMatchAdviceComponent,
    FunctionMatchAmountComponent,
    FunctionSelectOpenItemComponent,
    ProcessingFunctionComponent,
    ProfileDetailConditionComponent
} from "../other-components";

import {RemoteConfigurationComponent} from "../other-components/remote-configuration/remote-configuration.component";
import {ConditionService, ProfileSequenceService, ProfileService} from "../services";
import {ReplaceUndefinedPipe} from "../../shared/pipes/replace-undefined.pipe";
import {SharedModule} from "../../shared/shared.module";
import {ProfileServiceModule} from "../profile.service.module";
import {ProfileOtherModule} from "../profile.other.module";


const routes: any = [
    { path: '', component: ProfileHomeComponent },
    { path: 'add', component: ProfileDetailComponent },
    { path: 'edit/:name', component: ProfileDetailComponent },
    { path: 'usageInfo/:name', component: ProfileUsageInfoComponent }
];

@NgModule({
    imports: [
        CommonModule,
        DxSelectBoxModule,
        DxAccordionModule,
        DxTextBoxModule,
        DxDataGridModule,
        DxCheckBoxModule,
        DxFormModule,
        ReactiveFormsModule,
        FormsModule,
        DxDropDownBoxModule,
        DxButtonModule,
        DxSwitchModule,
        SharedModule,
        ProfileServiceModule,
        ProfileOtherModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ProfileHomeComponent,
        ProfileDetailComponent,
        ProfileUsageInfoComponent
    ],
    providers: []
})
export class ProfileModule {
}
