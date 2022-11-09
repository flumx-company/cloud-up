import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ActionButtonComponent} from "./component/action-button.component";


const routes: Routes = [
    {path: '', component: ActionButtonComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [
        ActionButtonComponent
    ],
    exports: [RouterModule],
    providers: []
})

export class ActionButtonModule {}
