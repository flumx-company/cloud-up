import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {DxAccordionModule} from 'devextreme-angular/ui/accordion';
import {DxListModule} from 'devextreme-angular/ui/list';
import {DxDataGridModule} from 'devextreme-angular/ui/data-grid';
import {SharedModule} from '../../../shared/shared.module';

import {UserExistService} from './_service/user.exist.service';

import {UserExistComponent} from "./component/user-exist.component";


const routes: Routes = [
    { path: '',  component: UserExistComponent},
];

@NgModule({
    imports: [
        CommonModule,
        DxDataGridModule,
        SharedModule,
        DxAccordionModule,
        DxListModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        UserExistComponent
    ],
    exports: [],
    providers: [UserExistService]
})

export class UserExistModule {}
