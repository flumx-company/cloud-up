import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RouterMenuComponent} from "./components/router-menu.component";

const routes: Routes = [
    { path: '',                      component:          RouterMenuComponent        },
    {
        path: 'agent-resolution-rule',
        loadChildren: './agent-resolution-rule-module/agent-resolution-rule.module#AgentResolutionRuleModule'
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    RouterMenuComponent
  ],
  exports: [RouterModule],
  providers: []
})

export class RoutingModule {}
