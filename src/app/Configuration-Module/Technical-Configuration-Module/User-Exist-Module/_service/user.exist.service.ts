import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserExist} from "../interface/user.exist.intrface";

@Injectable()

export class UserExistService {

    testObj:UserExist ={
        INSTANCE: '2134124',
        OBJECT:'12fsdfsdf',
        ARHIVEKEY: '124asdfxszf',
        OFFSET: '124124214',
        USERS: [
            {
                USER: 'eqweqwe',
                CLASS: 'qewqweqwe',
                TYPE: true,
                DESCRIPTIONS: [
                    {
                        LANG: '3213',
                        DESCRIPTION: '123333'
                    }
                ]
            }, {
                USER: '3',
                CLASS: 'qweee',
                TYPE: false,
                DESCRIPTIONS: [
                    {
                        LANG: 'f',
                        DESCRIPTION: 'ghnnh'
                    }
                ]
            }, {
                USER: 'q',
                CLASS: '5555',
                TYPE: false,
                DESCRIPTIONS: [
                    {
                        LANG: 'f',
                        DESCRIPTION: 'f'
                    }
                ]
            },
        ]
    };

    constructor(protected httpClient: HttpClient) { }

    getUserExistDocument(){
        return new Promise((resolve, reject) => {
            resolve({...this.testObj})
        })
    }

    setNewSourseDocument(data:UserExist){
        return this.httpClient.post<UserExist>(`api/configuration/source-values`, data)
    }

    putUserExistValues(data:UserExist){
        return new Promise((resolve, reject) => {
            this.testObj = {...data};
            resolve({message: 'ok'})
        })
    }

    deleteutUserExistValues(){
        return this.httpClient.delete<UserExist>(`api/configuration/source-values`)
    }
}
