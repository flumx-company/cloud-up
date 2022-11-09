import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {map} from "rxjs/operators";
import {COMPANY_CODE} from "../_interface/company .interface";

@Injectable()

export class CompanyCodeService {
    two_part_rule: string = 'company-code';
    constructor(
        protected httpClient: HttpClient,
    ) {
    }

    getCompanies(): Observable<COMPANY_CODE[]> {
        return this.httpClient.get<COMPANY_CODE>(`api/master-data/${this.two_part_rule}`)
            .pipe(
                map((data:COMPANY_CODE[] | any) => data.map((item:any) => this.company_forEach(item)))
            );
    }

    getCompany(burks: number): Observable<COMPANY_CODE> {
        return this.httpClient.get<COMPANY_CODE>(`api/master-data/${this.two_part_rule}/${burks}`);
    }

    createCompany(agentData: COMPANY_CODE) {
        return this.httpClient.post<COMPANY_CODE>(`api/master-data/${this.two_part_rule}`, agentData);
    }

    updateCompany(agentData: COMPANY_CODE, burks: number) {
        return this.httpClient.put<COMPANY_CODE>(`api/master-data/${this.two_part_rule}/${burks}`, agentData);
    }

    deleteCompany(burks: number) {
        return this.httpClient.delete<COMPANY_CODE>(`/api/master-data/${this.two_part_rule}/${burks}`);
    }
    private company_forEach(data:any){
        const action = ['AWSYS', 'BUKRS', 'BUTXT', 'ORT01', 'LAND1', 'WAERS', 'SPRAS'];
        const action2 = ['ARHIVEKEY', 'INSTANCE', 'OBJECT', 'OFFSET', 'SESSION', 'TENANT_ID'];
        data.MASTER = data && data.MASTER ? data.MASTER : {};
        data.two = [{}];
        action.forEach(item => data.MASTER[item] && data.MASTER && data.MASTER[item] ? data.MASTER[item] : '');
        action2.forEach(item => data.two[0][item] = data[item] ? data[item] : '');
        return data;
    }

    getLogical(): Observable<any> {
        return this.httpClient.get<any>(`api/master-data/logical-system`)
            .pipe(map((data: any) => data.map((item:any) => item.LOGICAL_SYSTEM)));
    }

}
