
export class CURRENCY {
    constructor(init?: Partial<any>) {
        Object.assign(this, init);
    }
    INSTANCE: String = '';
    OBJECT: String = '';
    ARHIVEKEY: String = '';
    OFFSET: String = '';
    CURRENCY: Values;
}
export class Values{
    constructor(init?: Partial<Values>) {
        Object.assign(this, init);
    }
    DESC_TRANSLATE: Descriptions[] = [];
    ISOCD: String = '';
}

export class Descriptions{
    constructor(init?: Partial<Descriptions>) {
        Object.assign(this, init);
    }
    LANG:String = '';
    VALUES = {
        TEXT: ''
    };
    index:number;
}
