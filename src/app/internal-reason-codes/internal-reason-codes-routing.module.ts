import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InternalReasonCodesHomeComponent } from './components/internal-reason-codes-home/internal-reason-codes-home.component';

const routes: Routes = [
  {
    path: 'internal-reason-codes',
    component: InternalReasonCodesHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalReasonCodesRoutingModule { }
