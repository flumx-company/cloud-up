import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {map, switchMap} from "rxjs/operators";
import {DetailScreenFieldConfigService} from "../../detail-screen-field-config-module/_service/detail-screen-field-config.service";

@Injectable()
export class SearchVariantService {
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
        return this.httpClient.get<any>(`api/configuration/search-fields?filter=`)
            .pipe(
                map((data:any) => {
                    let array:any = [];

                    data.SEARCH_FIELD_CONFIGS.forEach((variant:any) => {
                        Object.keys(variant).forEach((key:any) => {
                            if(key != "VARIANT") array = this.changeConcatArray(array, variant, key);
                        });
                    });

                    data.SEARCH_FIELD_CONFIGS && delete data.SEARCH_FIELD_CONFIGS;

                    this.data.items = array;
                    this.data.static = data;
                    return array
                }),
                switchMap(():any => this.detailScreenFieldConfigService.dropdownKey()),
                map((item):any => {
                    this.data.ptsModel = item;
                    return this.data
                }),
            );
    }

    updateVariant(data:any){
        return this.httpClient.put<any>(`api/configuration/search-fields?filter=`, data)
    }

    changeConcatArray(array:any, variant:any, type:any){
        return array.concat(variant[type].map( (types:any) => {
            types.LABELS_TRANSLATE = types.LABELS_TRANSLATE[0].LANG;
            types.TYPE_OBJECT = type;
            types.VARIANT = variant.VARIANT;
            types.id = this.detailScreenFieldConfigService.uuid(
                this.detailScreenFieldConfigService.makeWordRandom(20)
            );
            return types
        }))
    }
}
