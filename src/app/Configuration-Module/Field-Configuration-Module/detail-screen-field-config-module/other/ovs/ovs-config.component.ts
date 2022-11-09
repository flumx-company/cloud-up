import {
    Component,
    OnInit,
    Input,
    ViewChild,
    EventEmitter,
    Output,
    ElementRef
} from '@angular/core';
import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";
import {DxDataGridComponent} from "devextreme-angular/ui/data-grid";

import {confirm} from "devextreme/ui/dialog";
import {
    OVS_INTERFACE,
    OVS_RESULT_COLUMN_INTERFACE,
    OVS_SEARCH_BOX_TITLE_TITLE_INTERFACE,
} from "../../_interface/ovs";
import {MessageToast} from "../../../../../shared/helpers/message-toast";
import {DetailScreenFieldConfigService} from "../../_service/detail-screen-field-config.service";

@Component({
    selector: 'ovs-config',
    templateUrl: './ovs-config.component.html',
    styleUrls: ['./ovs-config.component.scss'],
})
export class OvsConfigComponent implements OnInit {

    @Input('ovsAction') ovsAction: string;
    @Input('ovsKey') ovsKey: string;
    @Input('ovsIsActive') ovsIsActive: boolean;
    @Input('ovsData') ovsData: OVS_INTERFACE;

    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    @ViewChild('dataSourceREF') dataSourceREF: ElementRef;
    @ViewChild('dataSourceTitleREF') dataSourceTitleREF: ElementRef;

    newOvsData: OVS_INTERFACE | any= new OVS_INTERFACE();
    dataSource:any = {};
    dataSourceTitle:any = {};

    buttonOptions: any = {
        text: 'Save OVS Changes',
        useSubmitBehavior: true
    };

    buttonOptionsLang: any = {
        text: 'Lang changes',
        useSubmitBehavior: true
    };

    popupLangId:string = '';
    popupLang:boolean = false;
    popupDataLang: any = {};

    @Output('dataPopub') dataPopub = new EventEmitter<OVS_INTERFACE | any>();

    constructor(
        private detailScreenFieldConfigService : DetailScreenFieldConfigService
    ) {}

    generateSecret(){
        return this.detailScreenFieldConfigService.uuid(
            this.detailScreenFieldConfigService.makeWordRandom(20)
        );
    }

    generateArrayWithId(array: any = [], nested?:string, name: any = 'id'){
        return array.map((item:any) => {
            item[name] = this.generateSecret();
            nested && item[nested] && (item[nested] = this.generateArrayWithId(item[nested], '', 'nestedId'));
            return item;
        });
    }
    deleteArrayWithId(array: any = [], nested?:string, name: any = 'id'){
        return array.map((item:any) => {
            item[name] && delete item[name];
            nested && item[nested] && (item[nested] = this.deleteArrayWithId(item[nested], '', 'nestedId'));
            return item;
        });
    }

    saveOvs () {

        this.newOvsData.RESULT_COLUMN = this.deleteArrayWithId(this.newOvsData.RESULT_COLUMN, 'LABELS_TRANSLATE');

        this.newOvsData.RESULT_COLUMN = this.newOvsData.RESULT_COLUMN.map((item:any) => {

            item.LABELS_TRANSLATE = item.LABELS_TRANSLATE.map((value:any) => {
                value.LANG = value.LANG.toUpperCase();
                value.VALUES.LABEL = value.VALUES.LABEL.toUpperCase();
                return value
            });

            return item
        });

        this.newOvsData.SEARCH_BOX_TITLE = {
            VALUES:this.deleteArrayWithId(this.newOvsData.SEARCH_BOX_TITLE)
        };
        this.newOvsData.SEARCH_BOX_TITLE = this.newOvsData.SEARCH_BOX_TITLE.map((value:any) => {
            value.LANG = value.LANG.toUpperCase();
            value.VALUES.LABEL = value.VALUES.LABEL.toUpperCase();
            return value
        });

        let data:any = {...this.newOvsData};
        data.hash = this.ovsKey;

        this.dataPopub.emit(data);
    }

    ngOnInit() {

        if(this.ovsAction && this.ovsAction !== 'add') {
            this.newOvsData = this.ovsData;
            this.newOvsData.SEARCH_BOX_TITLE = this.generateArrayWithId(this.newOvsData.SEARCH_BOX_TITLE.VALUES);
            this.newOvsData.RESULT_COLUMN = this.generateArrayWithId(
                this.newOvsData.RESULT_COLUMN, 'LABELS_TRANSLATE'
            );
        }

        this.dataSource = new DataSource({
            store: new CustomStore({
                load: () => {
                    return Promise.resolve(this.newOvsData)
                        .then(({RESULT_COLUMN}: any) => {
                            const length = RESULT_COLUMN.length;

                            return {
                                data: RESULT_COLUMN || [],
                                totalCount: RESULT_COLUMN ? length : 0
                            };
                        })
                        .catch(({error}:any) => {
                            MessageToast.showError(error && error.MESSAGE);
                            return {data: [], totalCount: 0};
                        });
                },
                insert: (values: any) => {
                    this.newOvsData.RESULT_COLUMN.push(
                        new OVS_RESULT_COLUMN_INTERFACE({
                            ...values,
                            id: this.generateSecret()
                        })
                    );

                    return Promise.resolve(this.newOvsData)
                        .then(() => this.dataGrid.instance.refresh())
                        .catch(() => {
                            MessageToast.showSuccess('Source added successfully');
                            return false
                        });
                },
                update: ({ id }: any, values: any) => {

                    let mainIndex;
                    const obj:any = this.newOvsData.RESULT_COLUMN.find(
                        (item:any, index: any) => {
                            const bool = item.id == id;
                            bool && (mainIndex = index);
                            return bool;
                        }
                    );

                    Object.keys(values).forEach(item => obj[item] = values[item]);

                    mainIndex && this.newOvsData.RESULT_COLUMN.splice(mainIndex , 1, obj);

                    return Promise.resolve(this.newOvsData)
                        .then(() => this.dataGrid.instance.refresh())
                        .catch(() => {
                            MessageToast.showSuccess('Source updated successfully');
                            return {data: [], totalCount: 0};
                        });
                },
                remove: ({ id }: any) => {

                    let mainIndex;

                    this.newOvsData.RESULT_COLUMN.find(
                        (item:any, index: any) => {
                            const bool = item.id == id;
                            bool && (mainIndex = `${index}`);
                            return bool;
                        }
                    );

                    mainIndex && this.newOvsData.RESULT_COLUMN.splice(mainIndex , 1);

                    return Promise.resolve(this.newOvsData)
                        .then(({ VALUES }: any) => {
                            this.dataGrid.instance.refresh();
                            MessageToast.showSuccess('Successfully removed');
                            return {
                                data:       VALUES || [],
                                totalCount: VALUES ? VALUES.length : 0
                            };
                        })
                        .catch(({ error }:any) => {
                            MessageToast.showError(error && error.MESSAGE);
                            return {data: [], totalCount: 0};
                        });
                }
            })
        });

        this.dataSourceTitle = new DataSource({
            store: new CustomStore({
                load: () => {
                    return Promise.resolve(this.newOvsData)
                        .then(({SEARCH_BOX_TITLE}: any) => {

                            const length = SEARCH_BOX_TITLE.length;

                            return {
                                data: SEARCH_BOX_TITLE || [],
                                totalCount: SEARCH_BOX_TITLE ? length : 0
                            };
                        })
                        .catch(({error}:any) => {
                            MessageToast.showError(error && error.MESSAGE);
                            return {data: [], totalCount: 0};
                        });
                },
                insert: (values: any) => {

                    values.LANG = values.LANG.toUpperCase();
                    values.VALUES = {};
                    values.VALUES.LABEL = values.LABEL.toUpperCase();
                    values.LABEL && delete values.LABEL;

                    this.newOvsData.SEARCH_BOX_TITLE.push(
                        new OVS_SEARCH_BOX_TITLE_TITLE_INTERFACE({
                            ...values,
                            id: this.generateSecret()
                        })
                    );

                    return Promise.resolve(this.newOvsData)
                        .then(() => {
                            this.dataGrid.instance.refresh();
                            return false
                        })
                        .catch(() => {
                            MessageToast.showSuccess('Source added successfully');
                            return false
                        });
                },
                remove: ({ id }: any) => {

                    let mainIndex;
                    this.newOvsData.SEARCH_BOX_TITLE.find(
                        (item:any, index: any) => {
                            const bool = item.id == id;
                            bool && (mainIndex = `${index}`);
                            return bool;
                        }
                    );

                    mainIndex && this.newOvsData.SEARCH_BOX_TITLE.splice(mainIndex , 1);

                    return Promise.resolve(this.newOvsData)
                        .then(() => {
                            this.dataGrid.instance.refresh();
                            MessageToast.showSuccess('Successfully removed successfully');
                        })
                        .catch(({ error }:any) => {
                            MessageToast.showError(error && error.MESSAGE);
                            return {data: [], totalCount: 0};
                        });
                }
            })
        });
    }

    changeDataNested({ value }: any, { id }: any,{ nestedId }:any,  type: any) {

        let changeData = this.newOvsData.RESULT_COLUMN.find((item: any) => item.id === id);
        if(changeData) {
            let DESCRIPTION = changeData.LABELS_TRANSLATE
                .find((item: any) => item.nestedId === nestedId);

            if(DESCRIPTION && type == 'LABEL') DESCRIPTION.VALUES[type] = value.toUpperCase();

            if(DESCRIPTION) DESCRIPTION[type] = value.toUpperCase()

        }
    }

    changeData(e: any, data: any, type: any){

        let changeData = this.newOvsData.SEARCH_BOX_TITLE.find((item: any) => item.id === data.id);

        changeData && type == 'VALUES' &&  (changeData[type].LABEL = e.value.toUpperCase());

        if(type == 'VALUES') return;

        changeData && (changeData[type] = e.value.toUpperCase());
    }


    deleteNestedItem({ id }: any, { nestedId }:any){

        confirm('Delete this row lang?', '')
            .then(res => {
                if(res) {

                    let changeData = this.newOvsData.RESULT_COLUMN.find((item: any) => item.id === id);

                    if(changeData) {

                        let indexMain = null;

                        changeData.LABELS_TRANSLATE
                            .find((item: any, index:any) => {
                                const dataFind = item.nestedId === nestedId;
                                dataFind && (indexMain = `${index}`);
                                return dataFind;
                            });

                        indexMain && changeData.LABELS_TRANSLATE.splice(Number(indexMain), 1)
                    }
                }
            });

    }

    CreateRowInLangTable(e:any){
        e.preventDefault();
        let changeData = this.newOvsData.RESULT_COLUMN.find(({id}: any) => id === this.popupLangId);

        this.popupDataLang.LANG = this.popupDataLang.LANG.toUpperCase();

        this.popupDataLang.VALUES.LABEL = this.popupDataLang.VALUES.LABEL.toUpperCase();

        changeData && (changeData.LABELS_TRANSLATE.push({
            ...this.popupDataLang,
            nestedId:  this.generateSecret()
        }));

        this.popupLang = false;
        return false;
    }


    popupHiding(){
        this.popupLang = false;
        this.popupDataLang = {};
    }

    onToolbarPreparingCustom({toolbarOptions}: any, type:any, flag: any = true) {
        const self:any = this;
        const arrayButton = [
            {
                widget: "dxButton",
                options: {
                    hint: 'Add',
                    icon: "add",
                    onClick: () => {
                        flag ? self[type].instance.addRow() : (this.popupLang = true, this.popupLangId = type);
                        this.popupDataLang = {}
                    }
                },
                location: "after"
            },
        ];

        toolbarOptions.items = [...arrayButton, ...toolbarOptions.items];
    }

    click_in_Icon({rowIndex}: any, name: string, type:any) {
        const self:any = this;
        name === 'edit'   && self[type].instance.editRow(rowIndex);
        name === 'delete' && self[type].instance.deleteRow(rowIndex);
    }
}
