import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DxAccordionModule, DxDataGridModule} from 'devextreme-angular';

import {ConfigService} from '../shared/services/config.service';
import {SharedModule} from '../shared/shared.module';
import { DxListModule } from "devextreme-angular";
import {AdviceHeaderViewComponent, IsasHomeComponent, StatementHeaderViewComponent} from './components';
import {PropertyFilterPipe} from './pipes/property-filter.pipe';
import {IsasService} from './services/isas.service';


@NgModule({
  imports: [CommonModule, DxDataGridModule, SharedModule, DxAccordionModule, DxListModule],
  declarations: [
    IsasHomeComponent, StatementHeaderViewComponent, PropertyFilterPipe,
    AdviceHeaderViewComponent
  ],
  exports: [IsasHomeComponent],
  providers: [ConfigService, IsasService]
})
export class IsasModule {
}
