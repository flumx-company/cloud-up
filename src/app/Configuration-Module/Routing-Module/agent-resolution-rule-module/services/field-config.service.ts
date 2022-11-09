import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class FieldConfigService {

    constructor(protected httpClient: HttpClient) {}

    getFieldConfig():any{
        return this.httpClient.get(`api/configuration/field-configs`);
    }

    // createFieldConfig(data: any) {
    //     return this.httpClient.post<Condition>(`${this.base}/api/configuration/field-configs`, conditionData);
    // }

    // updateFieldConfig(conditionData: Condition, conditionId: number) {
    //     return this.httpClient.put<Condition>(`${this.base}/api/configuration/field-configs/${conditionId}`, conditionData);
    // }

    // deleteCondition(conditionId: number) {
    //     return this.httpClient.delete<Condition>(`${this.base}/api/configuration/field-configs/${conditionId}`);
    // }
}
