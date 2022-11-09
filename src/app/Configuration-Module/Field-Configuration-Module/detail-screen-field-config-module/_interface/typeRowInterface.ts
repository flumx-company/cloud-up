import {FormatDetailList} from "../const/conts";


export class TypeRowInterface{
    constructor(init?: Partial<TypeRowInterface>) {
        Object.assign(this, init);
    }
    KEY:     string = '';
    LABEL:   string = '';
    REQD:    string = '';
    TYPE:    string = '';
    MAXLEN:  string = '';
    TOOLTIP: string = '';
    TAB:     string = '';
    data_name:string = '';
    VISIBLE: Array<string> = [];
    READONLY:Array<string> = [];
    visible: Array<{
        value:string,
        name:string
    }> = FormatDetailList.listWordAction;
    readonly: Array<{
        value:string,
        name:string
    }> = FormatDetailList.listWordAction;
    tab:string[] = FormatDetailList.listTab;
    key = ['STATS','RECNO'];
}
