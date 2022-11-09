import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {debounceTime, map} from "rxjs/operators";
import {combineLatest} from "rxjs/observable/combineLatest";
import {FormatDetailList} from "../const/conts";


@Injectable()
export class DetailScreenFieldConfigService {

    crypto:any = crypto;
    actionWord = FormatDetailList.listWordAction;
    action = FormatDetailList.listItem;
    constructor(
        protected httpClient: HttpClient
    ) { }

    getDetailRequest():any {
        return this.httpClient.get(`api/configuration/field-configs`)
            .pipe(
                map((data:any) => {
                    let array:any = [];

                    this.action.forEach(NAME =>{
                        data[NAME] && Array.isArray(data[NAME]) ? data[NAME] = data[NAME].map((item:any) => {
                            item.data_name = NAME;
                            item.id = this.uuid(this.makeWordRandom(20));
                            !item.DESCRIPTION_TRANSLATE && (item.DESCRIPTION_TRANSLATE = []);
                            return item;
                        }) : null;
                        data[NAME] && Array.isArray(data[NAME]) ? array = array.concat(data[NAME]) : null;
                    });

                    this.action.forEach(NAME => data[NAME] && delete data[NAME]);

                    const items = this.convertMethodsToString(array);

                    return { data, items }
                }),
            )
    }

    getDetail():any{
        return combineLatest(this.getDetailRequest(), this.dropdownKey())
    }

    updateDetail(data:any) {
        return this.httpClient.put(`api/configuration/field-configs`,data)
                .pipe(
                    debounceTime(500)
                )
    }

    dropdownKey() : any{
        return this.httpClient.get('api/pts/show-pts-model')
    }

    private convertMethodsToString(array:any = []){
        return array.map((item:any) => {

            if(item && item.LABELS){
                Object.keys(item.LABELS).forEach(label => item[label] = item.LABELS[label]);
                item.LABELS && delete item.LABELS
            }

            item.visible = this.wordMap(this.actionWord, item.VISIBLE);
            item.readonly = this.wordMap(this.actionWord, item.READONLY);

            this.reformateData(item.visible, item.VISIBLE);
            this.reformateData(item.readonly, item.READONLY);

            item.DETAIL = '';
            item.change = true;

            return item;
        })
    }

    private reformateData = (arr1:any,arr2:any) => {

        arr1.forEach((vis:any) => {
            if(!arr2) return;
            let index = arr2.indexOf(vis.value);
            vis.selected && arr2[index] && (arr2[index] = vis.name)
        });

    };


    private wordMap = (arr:any,data:any) => {

        let newArray = JSON.parse(JSON.stringify(arr));

        return newArray.map(({ value, selected, name }:any) => {
            const [lover,upper] = [value.toLowerCase(), value.toUpperCase()];
            selected = data ? (data.indexOf(lover) > -1 || data.indexOf(upper) > -1) : false;
            return { value, selected, name }
        });

    };

    uuid =(word:string)=>`${word}:${1e7+1e3+4e3+-8e3+1e11}`
        .replace(/[018]/g,(this.criptoID(18)).toString(16));

    private criptoID = (c:any) => (c^this.crypto.getRandomValues(new Uint32Array(32)));

    makeWordRandom(length:any) {
        let result             = '';
        const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) result += characters.charAt(Math.floor(Math.random() * charactersLength));
        return result;
    }

}
