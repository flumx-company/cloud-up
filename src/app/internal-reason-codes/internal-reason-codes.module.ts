import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternalReasonCodesRoutingModule } from './internal-reason-codes-routing.module';
import { InternalReasonCodesService } from './services/internal-reason-codes.service';
import { InternalReasonCodesHomeComponent } from './components/internal-reason-codes-home/internal-reason-codes-home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    InternalReasonCodesRoutingModule
  ],
  declarations: [InternalReasonCodesHomeComponent],
  providers: [InternalReasonCodesService]
})
export class InternalReasonCodesModule { }
