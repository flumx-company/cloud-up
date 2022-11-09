import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {BusinessPartnerCoreDataCreateComponent, BusinessPartnerCoreDataFormComponent, BusinessPartnerCoreDataHomeComponent, BusinessPartnerCoreDataUpdateComponent} from './components';

const routes: Routes = [
  {
    path: 'business-partner-core-data',
    component: BusinessPartnerCoreDataHomeComponent
  },
  {
    path: 'business-partner-core-data/partner',
    component: BusinessPartnerCoreDataFormComponent,
    children: [
      {path: 'update/:id', component: BusinessPartnerCoreDataUpdateComponent},
      {path: 'create', component: BusinessPartnerCoreDataCreateComponent}
    ]
  }
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class BusinessPartnerRoutingModule {
}
