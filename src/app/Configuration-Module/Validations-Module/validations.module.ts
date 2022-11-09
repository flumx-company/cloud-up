import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from "@angular/router";

import {ValidationsMenuComponent} from "./components/validations-menu.component";

const routes: Routes = [
    { path: '',                 component:    ValidationsMenuComponent     },
    {
        path: 'validation-rules',
        loadChildren: './validation-rules-module/validation-rules.module#ValidationRulesModule'
    },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    ValidationsMenuComponent
  ],
  exports: [RouterModule],
})

export class ValidationsModule {}
