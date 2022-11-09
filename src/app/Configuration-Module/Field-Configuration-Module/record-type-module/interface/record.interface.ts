export interface RecordInterface {
    INSTANCE: String,
    OBJECT: String,
    ARHIVEKEY: String,
    OFFSET: String,
    TYPES: Values[]
}
export interface Values{
    TYPE:String,
    DESCRIPTIONS:Descriptions[]
}

export interface Descriptions{
    LANG:String,
    DESCRIPTION:String
}
