import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";


import {DxValidatorModule} from 'devextreme-angular/ui/validator';
import {DxTextBoxModule} from 'devextreme-angular/ui/text-box';
import {DxTextAreaModule} from 'devextreme-angular/ui/text-area';
import {DxFormModule} from 'devextreme-angular/ui/form';
import {DxSwitchModule} from 'devextreme-angular/ui/switch';
import {DxDataGridModule} from 'devextreme-angular/ui/data-grid';
import {DxPopupModule} from 'devextreme-angular/ui/popup';
import {DxButtonModule} from 'devextreme-angular/ui/button';
import {DxAccordionModule} from 'devextreme-angular/ui/accordion';
import {DxListModule} from 'devextreme-angular/ui/list';
import {DxSelectBoxModule} from 'devextreme-angular/ui/select-box';
import {DxValidationGroupModule} from 'devextreme-angular/ui/validation-group';
import {DxDropDownBoxModule} from "devextreme-angular/ui/drop-down-box";

import {PtsApiComponent} from './components/pts-api/pts-api.component';
import {FieldConfigsComponent} from './components/field-configs/field-configs.component';
import {SearchFieldsComponent} from './components/search-fields/search-fields.component';
import {TranslationComponent} from './components/translation/translation.component';
import {OperationalComponent} from './components/operational/operational.component';
import {StatusesApiService} from './services/statuses-api.service';
import {OperationalService} from './services/operational.service';
import {TranslationService} from './services/translation.service';
import {SearchFieldsService} from './services/search-fields.service';
import {SourceValueService} from './services/source-value.service';
import {RecordTypeService} from './services/record-type.service';
import {FieldConfigsService} from './services/field-configs.service';
import {ValidationService} from './services/validation.service';
import {PaymentMethodsService} from './services/payment-methods.service';
import {ConditionService} from './services/condition.service';
import {PtsApiService} from './services/pts-api.service';
import {CompanyCodeService} from './services/company-code.service';
import {CurrencyService} from './services/currency.service';


@NgModule({
    imports: [
        CommonModule,
        DxFormModule,
        DxTextBoxModule,
        DxSwitchModule,
        DxTextAreaModule,
        DxDataGridModule,
        DxPopupModule,
        DxButtonModule,
        DxAccordionModule,
        DxValidatorModule,
        DxValidationGroupModule,
        DxDropDownBoxModule,
        DxListModule,
        DxSelectBoxModule
    ],
    declarations: [
        PtsApiComponent,
        FieldConfigsComponent,
        SearchFieldsComponent,
        TranslationComponent,
        OperationalComponent,
        // TestLogicalComponent,
    ],
    exports: [],
    providers: [
        StatusesApiService,
        OperationalService,
        TranslationService,
        SearchFieldsService,
        SourceValueService,
        RecordTypeService,
        FieldConfigsService,
        ValidationService,
        PaymentMethodsService,
        ConditionService,
        PtsApiService,
        CompanyCodeService,
        CurrencyService
    ]
})

export class ApiDocModule {}
