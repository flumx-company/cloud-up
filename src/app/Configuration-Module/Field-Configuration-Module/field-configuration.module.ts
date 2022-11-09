import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {FieldConfigurationMenu} from "./components/field-configuration-menu";

const routes: Routes = [
    {
        path: '',
        component:          FieldConfigurationMenu
    },
    {
        path: 'source-values',
        loadChildren: './source-value-module/source.value.module#SourceModule'
    },
    {
        path: 'record-types',
        loadChildren: './record-type-module/record-type.module#RecordTypeModule'
    },
    {
        path: 'search-variant',
        loadChildren: './search-variant-module/search.variant.module#SearchVariantModule'
    },
    {
        path: 'hitlist-variant',
        loadChildren: './hitlist-variant-module/hitlist.variant.module#HitlistVariantModule'
    },
    {
        path: 'detail-field-configuration',
        loadChildren: './detail-screen-field-config-module/detail-screen-field-config.module#DetailScreenFieldConfigModule'
    },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
      FieldConfigurationMenu
  ],
  exports: [RouterModule],
  providers: []
})

export class FieldConfigurationModule {
}
