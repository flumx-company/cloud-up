import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CONDITION} from "../interface/condition_interface";
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ConditionService {
    constructor(protected httpClient: HttpClient) {}

    getConditions(): Observable<CONDITION[]> {
        return this.httpClient.get<CONDITION[]>(`api/configuration/conditions`);
    }

    getCondition(conditionId: number): Observable<CONDITION> {
        return this.httpClient.get<CONDITION>(`api/configuration/conditions/${conditionId}`);
    }

    createCondition(conditionData: CONDITION) {
        return this.httpClient.post<CONDITION>(`api/configuration/conditions`, conditionData);
    }

    updateCondition(conditionData: CONDITION, conditionId: number) {
        return this.httpClient.put<CONDITION>(`api/configuration/conditions/${conditionId}`, conditionData);
    }

    deleteCondition(conditionId: number) {
        return this.httpClient.delete<CONDITION>(`api/configuration/conditions/${conditionId}`);
    }
}
