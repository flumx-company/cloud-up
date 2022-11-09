import {ListObject} from "./list-object";

export class RulesList {
    static readonly list = [
        new ListObject({technicalName: 'required_check',       displayName: 'required check'}),
        new ListObject({technicalName: 'format_check',         displayName: 'format check'}),
        new ListObject({technicalName: 'amount_check',         displayName: 'amount check'}),
        new ListObject({technicalName: 'custom_check',         displayName: 'custom check'}),
        new ListObject({technicalName: 'regexp_check',         displayName: 'regexp check'}),
        new ListObject({technicalName: 'duplicate_check',      displayName: 'duplicate check'}),
        new ListObject({technicalName: 'logical_system_check', displayName: 'logical system check'}),
        new ListObject({technicalName: 'company_code_check',   displayName: 'company code check'}),
        new ListObject({technicalName: 'currency_check',       displayName: 'Currency-Module check'}),
        new ListObject({technicalName: 'source_check',         displayName: 'source check'}),
        new ListObject({technicalName: 'record_type_check',    displayName: 'record type check'}),
        new ListObject({technicalName: 'vendor_check',         displayName: 'vendor check'}),
    ]
}
