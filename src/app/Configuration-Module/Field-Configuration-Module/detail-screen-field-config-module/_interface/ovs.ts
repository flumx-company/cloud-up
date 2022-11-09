export class OVS_INTERFACE {
    constructor(init?: Partial<OVS_INTERFACE>) {
        Object.assign(this, init);
    }
    API:string = "";
    KEY_FIELD:string = "";
    RESULT_COLUMN:Array<OVS_RESULT_COLUMN_INTERFACE> = [];

    SEARCH_BOX_TITLE: OVS_SEARCH_BOX_TITLE_VALUES_INTERFACE[] = []
}

export class OVS_RESULT_COLUMN_INTERFACE{
    constructor(init?: Partial<OVS_RESULT_COLUMN_INTERFACE>) {
        Object.assign(this, init);
    }
    MAPPING:string = "";
    LABELS_TRANSLATE:Array<OVS_SEARCH_BOX_TITLE_TITLE_INTERFACE> = [];

}

export class OVS_RESULT_COLUMN_LABEL_INTERFACE{
    constructor(init?: Partial<OVS_RESULT_COLUMN_LABEL_INTERFACE>) {
        Object.assign(this, init);
    }
    LABEL:string = "";
}

export class OVS_SEARCH_BOX_TITLE_VALUES_INTERFACE{
    constructor(init?: Partial<OVS_SEARCH_BOX_TITLE_VALUES_INTERFACE>) {
        Object.assign(this, init);
    }
    LANG: string = '';
}

export class OVS_SEARCH_BOX_TITLE_TITLE_INTERFACE{
    constructor(init?: Partial<OVS_SEARCH_BOX_TITLE_TITLE_INTERFACE>) {
        Object.assign(this, init);
    }
    LANG: string = '';
    VALUES: OVS_RESULT_COLUMN_LABEL_INTERFACE = new OVS_RESULT_COLUMN_LABEL_INTERFACE()
}
