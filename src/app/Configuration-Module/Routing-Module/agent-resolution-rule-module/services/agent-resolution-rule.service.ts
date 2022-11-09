import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AGENT_TYPE} from "../interfaces/agent-type-interface";
import {Observable} from 'rxjs/Observable';
import {map} from "rxjs/operators";


@Injectable()
export class AgentResolutionRuleService {

    constructor(protected httpClient: HttpClient) {}

    getAgentres(): Observable<AGENT_TYPE[]> {
        return this.httpClient.get<AGENT_TYPE[]>(`api/master-data/agent-resolution-rule`);
    }

    getAgentresn(agentId: number): Observable<AGENT_TYPE> {
        return this.httpClient.get<AGENT_TYPE>(`api/master-data/agent-resolution-rule/${agentId}`);
    }

    createAgentres(agentData: AGENT_TYPE) {
        return this.httpClient.post<AGENT_TYPE>(`api/master-data/agent-resolution-rule`, agentData);
    }

    updateAgentres(agentData: AGENT_TYPE, agentId: number) {
        return this.httpClient.put<AGENT_TYPE>(`api/master-data/agent-resolution-rule/${agentId}`, agentData);
    }

    deleteAgentres(agentId: number) {
        return this.httpClient.delete<AGENT_TYPE>(`/api/master-data/agent-resolution-rule/${agentId}`);
    }

    getAssigness() : any{
        return this.httpClient.get(`https://dev-auth-api.azurewebsites.net/api/admin/users/tenant`)
            .pipe(
                map((data:any) => {
                    return data.users
                        .filter((item:any) => item.XUSER ? true : item.FNAME || item.LNAME)
                        .map((item:any) => {
                            if(item.XUSER) return item.XUSER;
                            else return item.FNAME || item.LNAME
                        });
                })
            );
    }
}
