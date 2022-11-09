export interface Source {
    INSTANCE: String,
    OBJECT: String,
    ARHIVEKEY: String,
    OFFSET: String,
    VALUES: Values[]
}

export interface Values {
    VALUE: String,
    DESCRIPTIONS: Descriptions[]
}

export interface Descriptions {
    LANG: String,
    DESCRIPTION: String
}
