export class COMPANY_CODE {
    constructor(init?: Partial<COMPANY_CODE>) {
        Object.assign(this, init);
    }
    TENANT_ID : string;
    OBJECT    : string;
    ARHIVEKEY : string;
    INSTANCE  : string;
    OFFSET    : string;
    SESSION   : string;
    MASTER    : COMPANY_MASTER;
}

export class COMPANY_MASTER {
    constructor(init?: Partial<COMPANY_MASTER>) {
        Object.assign(this, init);
    }
    AWSYS: string;
    BUKRS: string;
    BUTXT: string;
    ORT01: string;
    LAND1: string;
    WAERS: string;
    SPRAS: string;
}
