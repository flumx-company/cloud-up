import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {StatusConfigComponent} from "./components/status-config.component";

const routes: Routes = [
    {path: '',            component: StatusConfigComponent},
    {
        path: 'exceptions',
        loadChildren: './Exceptions-Module/exceptions.module#ExceptionModule'
    },
    {
        path: 'main-status',
        loadChildren: './Main-Status-Module/main.status.module#StatusConfigModule'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [
        StatusConfigComponent
    ],
    exports: [RouterModule],
    providers: []
})

export class StatusConfigModule {}
