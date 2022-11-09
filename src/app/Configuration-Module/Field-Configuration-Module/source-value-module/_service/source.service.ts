import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Source} from "../interface/source_interface";
import {map} from "rxjs/operators";

@Injectable()
export class SourceService {

    constructor(protected httpClient: HttpClient) {
    }

    getSourseDocument() {
        return this.httpClient.get<Source>(`api/configuration/source-values`)
            .pipe(
                map((data: any) => {
                    data.VALUES = data.VALUES.map((item: any) => {
                        item.DESCRIPTIONS = Array.isArray(item.DESCRIPTIONS) ? item.DESCRIPTIONS : [{...item.DESCRIPTIONS}];
                        return item;
                    });
                    return data
                })
            )
    }

    setNewSourseDocument(data: any) {
        return this.httpClient.post<any>(`api/configuration/source-values`, data)
    }

    putSourseValues(data: Source) {
        return this.httpClient.put<Source>(`api/configuration/source-values`, data)
            .toPromise()
    }

    deleteutSourseValues() {
        return this.httpClient.delete<Source>(`api/configuration/source-values`)
    }
    test(currencyStatic:any){
        return new Promise((resolve, reject):any => {
            // setTimeout(function(){
            resolve({data: currencyStatic, totalCount: currencyStatic.length})
            // },300)
        })
    }

}
