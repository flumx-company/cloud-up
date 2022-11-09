import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {DxButtonModule} from 'devextreme-angular/ui/button';
import {DxTextBoxModule} from 'devextreme-angular/ui/text-box';
import {DxValidationGroupModule} from 'devextreme-angular/ui/validation-group';
import {DxAccordionModule} from 'devextreme-angular/ui/accordion';
import {DxPopupModule} from 'devextreme-angular/ui/popup';

import {RouterModule, Routes} from "@angular/router";
import {VendorsComponent} from "./component/vendors.component";
import {VendorsService} from "./service/vendors.service";
import {DxValidatorModule} from "devextreme-angular/ui/validator";
import {DxTextAreaModule} from "devextreme-angular/ui/text-area";



const routes: Routes = [
    {path: '', component: VendorsComponent},
];

@NgModule({
    imports: [
        CommonModule,
        DxButtonModule,
        DxTextBoxModule,
        DxValidationGroupModule,
        DxAccordionModule,
        DxValidatorModule,
        DxPopupModule,
        DxTextAreaModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        VendorsComponent
    ],
    providers: [
        VendorsService
    ],
    exports: [],
})
export class VendorsModule {
}
