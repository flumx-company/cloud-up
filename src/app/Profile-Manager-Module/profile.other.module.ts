
import {NgModule} from '@angular/core';
import {
    FunctionMatchAdviceComponent,
    FunctionMatchAmountComponent,
    FunctionSelectOpenItemComponent,
    ProcessingFunctionComponent,
    ProfileDetailConditionComponent,
    RemoteConfigurationComponent
} from "./other-components";

import {DxAccordionModule} from "devextreme-angular/ui/accordion";
import {DxButtonModule} from "devextreme-angular/ui/button";
import {DxCheckBoxModule} from "devextreme-angular/ui/check-box";
import {DxDataGridModule} from "devextreme-angular/ui/data-grid";
import {DxDropDownBoxModule} from "devextreme-angular/ui/drop-down-box";
import {DxFormModule} from "devextreme-angular/ui/form";
import {DxSelectBoxModule} from "devextreme-angular/ui/select-box";
import {DxTextBoxModule} from "devextreme-angular/ui/text-box";
import {DxSwitchModule} from "devextreme-angular/ui/switch";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";


@NgModule({
    imports:[
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
    ],
    declarations:[
        ProfileDetailConditionComponent,
        FunctionSelectOpenItemComponent,
        ProcessingFunctionComponent,
        FunctionMatchAmountComponent,
        RemoteConfigurationComponent,
        FunctionMatchAdviceComponent,
    ],
    exports:[
        ProfileDetailConditionComponent,
        FunctionSelectOpenItemComponent,
        ProcessingFunctionComponent,
        FunctionMatchAmountComponent,
        RemoteConfigurationComponent,
        FunctionMatchAdviceComponent
    ]
})
export class ProfileOtherModule {}
