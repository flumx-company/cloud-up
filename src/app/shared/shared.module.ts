import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {DxPieChartModule} from 'devextreme-angular/ui/pie-chart';
import {DxChartModule} from 'devextreme-angular/ui/chart';
import {DxButtonModule} from 'devextreme-angular/ui/button';
import {DxDataGridModule} from 'devextreme-angular/ui/data-grid';
import {DxFormModule} from 'devextreme-angular/ui/form';
import {DxPopupModule} from 'devextreme-angular/ui/popup';
import {DxSwitchModule} from 'devextreme-angular/ui/switch';
import {InfoPopupComponent} from './components/info-popup/info-popup.component';
import {ReplaceUndefinedPipe} from './pipes/replace-undefined.pipe';
import {FlagToIconDirective} from './directives/flag-to-icon.directive';

@NgModule({
    imports: [
        DxPopupModule,
        CommonModule
    ],
    declarations: [
        InfoPopupComponent,
        ReplaceUndefinedPipe,
        FlagToIconDirective
    ],
    exports: [
        DxPieChartModule,
        CommonModule,
        DxDataGridModule,
        DxFormModule,
        DxButtonModule,
        DxSwitchModule,
        InfoPopupComponent,
        ReplaceUndefinedPipe,
        DxChartModule,
        FlagToIconDirective
    ]
})
export class SharedModule {
}
