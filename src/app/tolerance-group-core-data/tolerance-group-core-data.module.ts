import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DxSwitchModule} from 'devextreme-angular';

import {SharedModule} from '../shared/shared.module';

import {ToleranceGroupDetailComponent, ToleranceGroupHomeComponent} from './components';
import {PaymentDifferenceComponent} from './components/payment-difference/payment-difference.component';
import {ToleranceGroupService} from './services/tolerance-group.service';
import {ToleranceGroupRoutingModule} from './tolerance-group-routing.module';

@NgModule({
  imports: [CommonModule, SharedModule, ToleranceGroupRoutingModule],
  declarations: [
    ToleranceGroupHomeComponent, ToleranceGroupDetailComponent,
    PaymentDifferenceComponent
  ],
  exports: [ToleranceGroupHomeComponent],
  providers: [ToleranceGroupService]
})

export class ToleranceGroupCoreDataModule {
}
