import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NotificationComponent} from "./component/notification.component";





const routes: Routes = [
    {path: '', component: NotificationComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [
        NotificationComponent
    ],
    exports: [RouterModule],
    providers: []
})

export class NotificationModule {}
