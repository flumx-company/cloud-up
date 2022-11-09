import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {GeneralTechnicalComponent} from "./components/general-technical.component";

const routes: Routes = [
    { path: '',               component:        GeneralTechnicalComponent},
    { path: 'user-exist',     loadChildren: './User-Exist-Module/user.exist.module#UserExistModule'             },
    { path: 'logical-system', loadChildren: './Logical-System-Module/logical.system.module#LogicalSystemModule' },
    { path: 'conditions',     loadChildren: './Conditions-module/conditions.module#ConditionsModule'            },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
      GeneralTechnicalComponent
  ],
  exports: [RouterModule],
  providers: []
})

export class TechnicalConfigurationModule {
}
