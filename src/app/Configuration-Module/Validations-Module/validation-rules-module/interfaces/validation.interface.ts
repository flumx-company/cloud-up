
export class VALIDATION {
    constructor(init?: Partial<VALIDATION>) {
        Object.assign(this, init);
    }
    CLIENT_TYPE:      string = '';
    OBJECT:           string = 'VALIDATION_RULE';
    OFFSET:           string = 'VALIDATION_RULE';
    ARCHIVEKEY:       string = '';
    REC_TYPE:         string = '';
    RULES: RULES[] |  any = [];
    TENANT_ID:        string = '';
    ASSIGNEES:        any
}

export class RULES {
    constructor(init?: Partial<RULES>) {
        Object.assign(this, init);
    }
    SEQ:        number;
    CHECK_TYPE: string = '';
    ABORT_POST: boolean = false;
    GOON:       boolean = false;
    WEBHOOK:    string = '';
    MESSAGE:    string = '';
}
