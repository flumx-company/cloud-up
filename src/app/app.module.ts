//angular modules
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CoreModule} from './core/core.module';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OAuthModule} from 'angular-oauth2-oidc';

//dev extreme modules
import {DxButtonModule} from 'devextreme-angular/ui/button';
import {DxDataGridModule} from 'devextreme-angular/ui/data-grid';
import {DxFormModule} from 'devextreme-angular/ui/form';
import {DxMenuModule} from 'devextreme-angular/ui/menu';
import {DxSelectBoxModule} from 'devextreme-angular/ui/select-box';
import {DxCheckBoxModule} from 'devextreme-angular/ui/check-box';

// app modules
import {AppRoutingModule} from './app.routing';
import {AccountingSystemCoreDataModule} from './accounting-system-core-data/accounting-system-core-data.module';
import {BusinessPartnerCoreDataModule} from './business-partner-core-data/business-partner-core-data.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {FineFilterModule} from './fine-filter/fine-filter.module';
import {IsasModule} from './isas/isas.module';
import {OpenItemCoreDataModule} from './open-item-core-data/open-item-core-data.module';
import {OriginCoreDataModule} from './origin-core-data/origin-core-data.module';
import {ProfileManagerModule} from './Profile-Manager-Module/profile-manager.module';
import {ReplacementDataModule} from './replacement-data/replacement-data.module';
import {RestrictionsModule} from './restrictions/restrictions.module';
import {ToleranceGroupCoreDataModule} from './tolerance-group-core-data/tolerance-group-core-data.module';
import {UserManagerModule} from './user-manager/user-manager.module';
import {InternalReasonCodesModule} from './internal-reason-codes/internal-reason-codes.module';
import {PersonalDataModule} from "./personal-data/personal-data.module";
import {ApiDocModule} from './api-doc/api-doc.module';

//app components
import {AppComponent} from './app.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {NavigationComponent} from './shared/components/navigation/navigation.component';
import {CompleteRegistrationComponent} from './core/components/complete-registration/complete-registration.component';

//app services
import {AuthGuardService} from './shared/services/auth-guard.service';
import {AuthService} from './shared/services/auth.service';
import {ConfigService} from './shared/services/config.service';
import {AuthInterceptor} from './shared/auth.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        NavigationComponent,
        CompleteRegistrationComponent
    ],
    imports: [
        AppRoutingModule,
        CoreModule,
        OAuthModule.forRoot(),
        BrowserModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        DxButtonModule,
        DxDataGridModule,
        DxFormModule,
        DxMenuModule,
        DxSelectBoxModule,
        DxCheckBoxModule,
        BrowserAnimationsModule,
        // DashboardModule,
        ApiDocModule,
        OpenItemCoreDataModule,
        OriginCoreDataModule,
        UserManagerModule,
        AccountingSystemCoreDataModule,
        IsasModule,
        RestrictionsModule,
        ProfileManagerModule,
        FineFilterModule,
        BusinessPartnerCoreDataModule,
        ToleranceGroupCoreDataModule,
        ReplacementDataModule,
        PersonalDataModule,
        InternalReasonCodesModule,
        DashboardModule
    ],
    providers: [
        ConfigService,
        AuthGuardService,
        AuthService,

        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
