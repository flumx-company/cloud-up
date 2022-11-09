import {Component, OnInit, ViewChild} from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import {InfoPopupComponent} from '../../../../../shared/components/info-popup/info-popup.component';
import {DataGridUtil} from '../../../../../shared/helpers/data-grid-util';
import {MessageToast} from '../../../../../shared/helpers/message-toast';
import {DxDataGridComponent} from "devextreme-angular";

import {Router} from "@angular/router";
import {DetailScreenFieldConfigService} from "../../../detail-screen-field-config-module/_service/detail-screen-field-config.service";
import {RecordTypeService} from "../../_service/record.type.service";


@Component({
    selector: 'record-type-home',
    templateUrl: './record-type-home.component.html',
    styleUrls: ['./record-type-home.component.css']
})
export class RecordTypeHomeComponent implements OnInit {
    @ViewChild(InfoPopupComponent) infoPopup?: InfoPopupComponent;
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    dataSource: any = {
        value: DataSource,
        obj: {},
        staticArray: []
    };
    customizeColumns = DataGridUtil.customizeColumns;
    defLength:any = [];
    private _defLength2:any = '';
    isNewDoc = true;
    dataStatic:any = {}

    constructor(
        private sourceService: RecordTypeService,
        private DetailScreen: DetailScreenFieldConfigService,
        private router: Router,
    ) {
        this.defLength2 = navigator.language.split('-')[0].toUpperCase();
        this.dataSource.value = new DataSource({
            store: new CustomStore({
                load: (loadOptions: any) => {
                    return this.sourceService.getRecordDocument()
                        .toPromise()
                        .then((data: any) => {

                            data.TYPES = data.TYPES.map((item:any) => {
                                item.id = this.DetailScreen.uuid(this.DetailScreen.makeWordRandom(20));
                                return item;
                            });
                            this.dataStatic = data;
                            data = data.TYPES;

                            data = data.map((item:any) => {
                                let obj:any = {
                                    LANG: [],
                                    DESCRIPTION: []
                                };
                                let array_count:any = [];
                                item.status = item.DESCRIPTIONS.length > 0;
                                item.DESCRIPTIONS.forEach((item:any) => {
                                    Object.keys(item).forEach(
                                        data => item[data] && obj[data] && obj[data].push(item[data])
                                    )
                                });
                                item.DESCRIPTION = {};

                                obj.LANG.forEach((lang:any, index:any) => {
                                    let err = true;
                                    this.defLength2 && lang.toUpperCase() !== this.defLength2.toUpperCase()
                                        ?
                                        this.defLength2 && lang.toUpperCase().indexOf(this.defLength2.toUpperCase()) != -1
                                            ? null
                                            : array_count.push(index)
                                        : err = false;
                                });
                                array_count
                                    .reverse()
                                    .forEach((count:any) => {
                                        obj.LANG.splice(Number(count), 1);
                                        obj.DESCRIPTION.splice(Number(count), 1);
                                    });
                                item.DESCRIPTION.LANG = obj.LANG.join(',');
                                item.DESCRIPTION.DESCRIPTION = obj.DESCRIPTION.join(',');
                                item.DESCRIPTIONS && delete item.DESCRIPTIONS;
                                return item;
                            });

                            this.defLength = [];
                            const action = [{
                                varieble:'orderLangFilter',
                                name: 'LANG'
                            },{
                                varieble:'orderTextFilter',
                                name: 'DESCRIPTION'
                            }];

                            action.forEach(item => this.builderFilter(item.varieble,data,item.name));

                            const length = data.length;

                            return {
                                data:       data ? data.splice(
                                    loadOptions && loadOptions.skip ? loadOptions.skip : 0,
                                    loadOptions && loadOptions.take ? loadOptions.take : length
                                ) : [],
                                totalCount: data ? length : 0
                            };
                    })
                    .catch((error:any) => {
                        if(error.status == 404) this.isNewDoc = false;
                        if(error.status != 404) MessageToast.showError(error.error ? error.error.MESSAGE : 'Error get data');
                        return {data: [], totalCount: 0};
                    });
                },

                remove: (obj: any) => {
                    let statics = JSON.parse(JSON.stringify(this.dataStatic));
                    let mainIndex = '';
                    statics._id && delete statics._id;
                    statics.TYPES.find((item:any, index: any) => {
                        const find = item.id == obj.id;
                        find && (mainIndex = `${index}`);
                        return find;
                    });
                    mainIndex && statics.TYPES.splice(Number(mainIndex), 1);
                    statics.VALUTYPESES = statics.TYPES.map((item:any) => {

                        item.DESCRIPTIONS = [];
                        item.DESCRIPTION.LANG = item.DESCRIPTION.LANG.split(',');
                        item.DESCRIPTION.DESCRIPTION = item.DESCRIPTION.DESCRIPTION.split(',');

                        item.DESCRIPTION.DESCRIPTION.forEach((descript:any, index: any) => item.DESCRIPTIONS.push({
                                LANG:item.DESCRIPTION.LANG[index],
                                DESCRIPTION: descript
                            }));
                        item.DESCRIPTION && delete item.DESCRIPTION;
                        item.id && delete item.id;
                        return item;
                    });
                    return this.sourceService.putRecordValues(statics)
                        .then(() => this.dataGrid.instance.refresh())
                        .catch((error:any) => {
                            MessageToast.showError(error.error ? error.error.MESSAGE : 'Error remove item');
                            return {data: [], totalCount: 0};
                        });
                }
            })
        });
    }


    get defLength2() {
        return this._defLength2
    }

    set defLength2(data:any) {
        this._defLength2 = data;
    }

    builderFilter(variable:string, data:any, nameMethod:string){
        const self:any = this;
        self[variable] = [];
        let array:any = [];
        data.forEach((item:any) => array = [...array,...item.DESCRIPTION[nameMethod].split(',')]);
        self[variable] = [...new Set(array)]
            .map((item:any) => {
                return {
                    text:item.toUpperCase(),
                    value:[`DESCRIPTION.${nameMethod}`,  "contains", item.toUpperCase()]
                }
            });
    }


    ngOnInit() {
    }

    onToolbarPreparingCustom(e: any) {
        const arrayButton = [
            {
                widget: "dxButton",
                options: {
                    hint: 'Add',
                    icon: "add", onClick: () => this.router.navigateByUrl('configuration/field-configuration/record-types/add')
                },
                location: "after"
            },
            {
                widget: "dxButton",
                options: {
                    hint: 'Refresh',
                    icon: "refresh", onClick: ()  => e.component.refresh()
                },
                location: "after"
            },
            {
                widget: "dxButton",
                options: {
                    hint: 'exportxlsx',
                    icon: "exportxlsx", onClick: () => this.dataGrid.instance.exportToExcel(false)
                },
                location: "after"
            }
        ];

        e.toolbarOptions.items = [...arrayButton, ...e.toolbarOptions.items];
    }

    buttonAdd = (e: any) => !e.row.data.Pred;

    sortingValue = (event: any) => {
        event.fullName == "columns[1].filterValue" && this.dataGrid.instance.refresh();
        event.value == null && this.dataGrid.instance.refresh();
    };

    click_in_Icon({rowIndex}: any, name: string) {
        name === 'edit'   && this.router.navigateByUrl(`configuration/field-configuration/record-types/edit/${rowIndex}`)
        name === 'delete' && this.dataGrid.instance.deleteRow(rowIndex);
        name === 'add'    && this.router.navigateByUrl('configuration/field-configuration/record-types/add')
    }

    newDoc(){
        const data = {
            "INSTANCE": "string",
            "OBJECT": "SOURCE_VALUE",
            "ARHIVEKEY": "string",
            "OFFSET": "SOURCE_VALUE",
            "TYPES": [
                {
                    "TYPE": "TEST",
                    "DESCRIPTIONS": [
                        {
                            "LANG": "TEST",
                            "DESCRIPTION":  "TEST"
                        }]
                }]
        };
        this.sourceService.setRecordDocument(data)
            .subscribe(res => this.isNewDoc = true)
    }
}

