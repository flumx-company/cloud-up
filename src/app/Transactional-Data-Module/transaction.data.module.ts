import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { DashboardTransactionalDataComponent } from "./component/dashboard-transactional-data.component";
import { DashboardDataService } from "../dashboard/services/dashboard-data.service";
import { CommonModule } from "@angular/common";



const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: DashboardTransactionalDataComponent                   },
            { path: 'sapUi5',      loadChildren: './sapui5-open/sapui5.module#SapModule' },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ],
    declarations: [
        DashboardTransactionalDataComponent,
        // sapUi5,
    ],
    exports: [],
    providers: [DashboardDataService]
})

export class TransactionDataModule { }
