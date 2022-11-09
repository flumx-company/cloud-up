import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonalDataComponent} from './components/personal-data/personal-data.component';
import {DxAccordionModule, DxCheckBoxModule, DxSelectBoxModule, DxTextBoxModule} from 'devextreme-angular';

import {SharedModule} from '../shared/shared.module';
import {PersonalDataService} from "./services/personal-data.service";
import {WebsocketService} from './services/websocket.service';

@NgModule({
  imports: [
    CommonModule, DxSelectBoxModule, DxAccordionModule,
    DxTextBoxModule, DxCheckBoxModule, SharedModule
  ],
  providers: [PersonalDataService, WebsocketService],
  declarations: [PersonalDataComponent]
})
export class PersonalDataModule {
}
