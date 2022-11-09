export interface UserExist {
    INSTANCE: String,
    OBJECT: String,
    ARHIVEKEY: String,
    OFFSET: String,
    USERS: Array<Users>
}

export interface Users {
    USER: String,
    CLASS: String,
    TYPE: boolean,
    DESCRIPTIONS: Array<Descriptions>
}

export interface Descriptions {
    LANG: String,
    DESCRIPTION: String
}
