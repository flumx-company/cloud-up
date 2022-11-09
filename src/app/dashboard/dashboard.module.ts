import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../shared/shared.module';

import {
    WidgetAssignmentQuoteComponent,
    WidgetDataRatioComponent,
    WidgetProcessMonitorComponent,
    WidgetProcessOverviewComponent,
} from './components';

import {DashboardDataService} from './services/dashboard-data.service';
import {DashboardMonitoringComponent} from "./components/dashboard-monitoring/dashboard-monitoring.component";

import {DashboardSettingsComponent} from "./components/dashboard-settings/dashboard-settings.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,

    ],
    declarations: [
        WidgetProcessMonitorComponent,
        WidgetDataRatioComponent,
        WidgetProcessOverviewComponent,
        WidgetAssignmentQuoteComponent,
        DashboardMonitoringComponent,
        DashboardSettingsComponent
    ],
    exports: [
        WidgetProcessMonitorComponent,
        WidgetDataRatioComponent,
        WidgetProcessOverviewComponent,
        WidgetAssignmentQuoteComponent,
        DashboardMonitoringComponent,
        DashboardSettingsComponent
    ],
    providers: [DashboardDataService]
})

export class DashboardModule {
}
