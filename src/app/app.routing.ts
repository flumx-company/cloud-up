import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {OperationalComponent} from "./api-doc/components/operational/operational.component";
import {AdviceHeaderViewComponent, IsasHomeComponent, StatementHeaderViewComponent} from "./isas/components";
import {
    AccountingSystemCoreDataDetailComponent,
    AccountingSystemCoreDataHomeComponent
} from "./accounting-system-core-data/components";
import {OpenItemCoreDataEditComponent} from "./open-item-core-data/components/open-item-core-data-edit/open-item-core-data-edit.component";
import {OriginCoreDataHomeComponent} from "./origin-core-data/components/origin-core-data-home/origin-core-data-home.component";
import {OriginDetailComponent} from "./origin-core-data/components/origin-detail/origin-detail.component";
import {OriginGroupDetailComponent} from "./origin-core-data/components/origin-group-detail/origin-group-detail.component";
import {UserManagerHomeComponent} from "./user-manager/components/user-manager-home/user-manager-home.component";
import {RestrictionHomeComponent} from "./restrictions/components/restriction-home/restriction-home.component";
import {
    FineFilterDetailComponent,
    FineFilterHomeComponent,
    FineFilterUsageInfoComponent
} from "./fine-filter/components";
import {ReplacementDataHomeComponent} from "./replacement-data/components/replacement-data-home/replacement-data-home.component";
import {CompleteRegistrationComponent} from "./core/components";
import {PersonalDataComponent} from "./personal-data/components/personal-data/personal-data.component";

import {AuthGuardService} from "./shared/services/auth-guard.service";

const routes: Routes = [
    {
        path: 'configuration',
        loadChildren: './Configuration-Module/configuration.module#ConfigurationMenuModule'
    },

    {
        path: 'master-data',
        loadChildren: './Master-Data-Module/master.data.module#MasterDataModule'
    },

    {
        path: 'reporting',
        loadChildren: './Reporting-module/reporting.module#ReportingModule'
    },

    {
        path: 'transactions',
        loadChildren: './Transactional-Data-Module/transaction.data.module#TransactionDataModule'
    },

    {
        path: '',
        loadChildren: './Start-Module/start.module#StartModule'
    },

    {
        path: 'profile-manager',
        loadChildren: './Profile-Manager-Module/profile-manager.module#ProfileManagerModule'
    },

    {
        path: 'operational',
        component: OperationalComponent
    },


    //old structure
    {
        path: 'isas',
        children: [
            {path: '', pathMatch: 'full', component: IsasHomeComponent},
            {path: 'statement/detail/:id', component: StatementHeaderViewComponent},
            {path: 'advice/detail/:id', component: AdviceHeaderViewComponent}
        ]
    },
    {
        path: 'accounting-systems',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: AccountingSystemCoreDataHomeComponent
            },
            {
                path: 'detail/:mode',
                component: AccountingSystemCoreDataDetailComponent
            },
            {
                path: 'detail/:mode/:id',
                component: AccountingSystemCoreDataDetailComponent
            }
        ]
    },
    {
        path: 'open-item-core-data/:id',
        component: OpenItemCoreDataEditComponent
    },
    {
        path: 'origin-core-data',
        children: [
            {path: '', pathMatch: 'full', component: OriginCoreDataHomeComponent},
            {path: 'origin/edit/:name', component: OriginDetailComponent},
            {path: 'origin/add', component: OriginDetailComponent},
            {path: 'originGroup/edit/:name', component: OriginGroupDetailComponent},
            {path: 'originGroup/add', component: OriginGroupDetailComponent}
        ]
    },
    {
        path: 'user-manager',
        component: UserManagerHomeComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'restrictions',
        component: RestrictionHomeComponent
    },
    {
        path: 'fine-filter',
        children: [
            {path: '', pathMatch: 'full', component: FineFilterHomeComponent},
            {path: 'add', component: FineFilterDetailComponent},
            {path: 'edit/:name', component: FineFilterDetailComponent},
            {path: 'usageInfo/:name', component: FineFilterUsageInfoComponent}
        ]
    },
    {
        path: 'replacement-data',
        component: ReplacementDataHomeComponent
    },
    {
        path: 'registrationConfirm/:uuid',
        component: CompleteRegistrationComponent
    },
    {
        path: 'personal-data',
        component: PersonalDataComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
