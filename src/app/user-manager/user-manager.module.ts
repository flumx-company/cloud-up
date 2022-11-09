import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DxTagBoxModule, DxTemplateModule, DxTextBoxModule, DxLookupModule} from 'devextreme-angular';

import { SharedModule } from '../shared/shared.module';
import {UserManagerHomeComponent} from './components/user-manager-home/user-manager-home.component';
import {RoleService} from './services/role.service';
import {TenantService} from './services/tenant.service';
import {UserManagerService} from './services/user-manager.service';
import {RegistrationService} from './services/registration.service';

@NgModule({
  imports: [
    CommonModule,
    DxTemplateModule,
    DxLookupModule,
    DxTagBoxModule,
    DxTextBoxModule,
    SharedModule
  ],
  declarations: [UserManagerHomeComponent],
  exports: [UserManagerHomeComponent],
  providers: [
    RoleService,
    TenantService,
    UserManagerService,
    RegistrationService
  ]
})
export class UserManagerModule {
}
