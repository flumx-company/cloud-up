import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';


@Injectable()
export class FieldConfigService {

    constructor(protected httpClient: HttpClient) { }

    getFieldConfig():any{
        return this.httpClient.get(`api/configuration/field-configs`);
    }

}
