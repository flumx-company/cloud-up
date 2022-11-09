import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ToleranceGroupDetailComponent, ToleranceGroupHomeComponent} from './components';

const routes: Routes = [{
  path: 'tolerance-group-core-data',
  children: [
    {path: '', pathMatch: 'full', component: ToleranceGroupHomeComponent},
    {path: 'add', component: ToleranceGroupDetailComponent},
    {path: 'edit/:name', component: ToleranceGroupDetailComponent}
  ]
}];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class ToleranceGroupRoutingModule {
}
