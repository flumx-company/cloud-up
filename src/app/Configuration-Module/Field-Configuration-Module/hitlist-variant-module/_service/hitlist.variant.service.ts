import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { map ,switchMap} from "rxjs/operators";
import {DetailScreenFieldConfigService} from "../../detail-screen-field-config-module/_service/detail-screen-field-config.service";




@Injectable()
export class HitlistVariantService {
    data = {
        items : [],
        ptsModel:{},
        config: {},
        static:{}
    };
    constructor(
        protected httpClient: HttpClient,
        private detailScreenFieldConfigService : DetailScreenFieldConfigService
    ) {}

    getVariant(): Observable<any> {
        return this.httpClient.get<any>(`api/configuration/result-fields`)
            .pipe(
                map((data:any) => {
                    let array:any = [];
                    data.RESULT_FIELD_CONFIGS.forEach((variant:any) => {
                        Object.keys(variant).forEach((key:any) => {
                            if(key != "VARIANT") array = this.changeConcatArray(array, variant, key);
                        });
                    });
                    data.RESULT_FIELD_CONFIGS && delete data.RESULT_FIELD_CONFIGS;
                    this.data.items = array;
                    this.data.static = data;
                    return array;
                }),
                switchMap(():any => this.detailScreenFieldConfigService.dropdownKey()),
                switchMap((item):any => {
                    this.data.ptsModel = item;
                    return this.getConfig()
                }),
                map((item):any => {
                    this.data.config = item;
                    return this.data
                })
            );
    }

    updateVariant(data:any): Observable<any> {
        return this.httpClient.put<any>(`api/configuration/result-fields`,data)
    }

    changeConcatArray(array:any, variant:any, type:any){
        return array.concat(variant[type].map( (types:any) => {
            types.LABELS && types.LABELS.LABEL ?  types.TITLE = types.LABELS.LABEL : null;
            types.LABELS && types.LABELS.TOOLTIP ? types.TOOLTIP = types.LABELS.TOOLTIP : null;
            types.LABELS  && delete types.LABELS;
            types.LABELS_TRANSLATE = types.LABELS_TRANSLATE[0].LANG;
            types.TYPE_OBJECT = type;
            types.VARIANT = variant.VARIANT;
            types.ACTIVE = types.ACTIVE;
            types.TYPE = types.TYPE || '';
            types.FIELD_TYPE = types.FIELD_TYPE || '';
            types.TITLE = types.TITLE || '';
            types.id = this.detailScreenFieldConfigService.uuid(
                this.detailScreenFieldConfigService.makeWordRandom(20)
            );
            return types
        }))
    }

    getConfig(){
        return this.httpClient.get(`api/configuration/field-configs`)
    }
}
