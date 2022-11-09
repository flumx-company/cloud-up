import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DxButtonModule, DxDataGridModule} from 'devextreme-angular';
import {SharedModule} from '../shared/shared.module';
import {ReplacementDataHomeComponent} from './components/replacement-data-home/replacement-data-home.component';
import {AccountingSystemService} from './services/accounting-system.service';
import {ReplacementDataService} from './services/replacement-data.service';

@NgModule({
  imports: [CommonModule, DxButtonModule, DxDataGridModule, SharedModule],
  declarations: [ReplacementDataHomeComponent],
  providers: [ReplacementDataService, AccountingSystemService],
  exports: [ReplacementDataHomeComponent],
})
export class ReplacementDataModule {
}
