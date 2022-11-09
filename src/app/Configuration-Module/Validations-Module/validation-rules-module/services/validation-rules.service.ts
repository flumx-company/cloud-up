import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RULES, VALIDATION} from "../interfaces/validation.interface";

@Injectable()
export class ValidationRulesService {

    constructor(protected httpClient: HttpClient) {}

    getRules(type:any = '', step = true) :any{
        return this.httpClient.get<VALIDATION>(`api/configuration/validation/rules?recType=${type}`).toPromise();
    }

    setRules(data: VALIDATION) {
        return this.httpClient.post<VALIDATION>(`api/configuration/validation/rules`, data);
    }

    createRule(data: any) {
        return this.httpClient.put<any>(`api/configuration/validation/rules`, data);
    }

    updateRule(oldData: RULES,data: RULES) {
        debugger;
        return this.httpClient.put<RULES>(`api/configuration/validation/rules/${oldData.SEQ}`, data);
    }

    deleteRules(data: any) {
        return this.httpClient.delete<VALIDATION>(`api/configuration/validation/rules/${data.SEQ}`, data);
    }

    test(data:any) {
        return new Promise((resolve) => resolve(data));
    }
}
