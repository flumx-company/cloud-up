
import {NgModule} from '@angular/core';
import {
    AccountingSystemService,
    ConditionService,
    FineFilterService,
    OriginGroupService,
    OriginService,
    ProfileSequenceService,
    ProfileService,
    RestrictionService,
    ToleranceGroupService
} from "./services";


@NgModule({
    providers: [
        ProfileService,
        ProfileSequenceService,
        OriginService,
        OriginGroupService,
        ConditionService,
        AccountingSystemService,
        RestrictionService,
        FineFilterService,
        ToleranceGroupService
    ]
})
export class ProfileServiceModule {
}
