import {Component, OnInit, ViewChildren, QueryList} from '@angular/core';
import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";
import {MessageToast} from "../../../../shared/helpers/message-toast";
import {DetailScreenFieldConfigService} from "../_service/detail-screen-field-config.service";
import {DxDataGridComponent} from "devextreme-angular";
import {TypeRowInterface} from "../_interface/typeRowInterface";
import {confirm} from "devextreme/ui/dialog";
import {OVS_INTERFACE} from "../_interface/ovs";
import {FormatDetailList} from "../const/conts";

@Component({
    selector: 'app-detail-screen-field-config',
    templateUrl: './detail-screen-field-config.component.html',
    styleUrls: ['./detail-screen-field-config.component.scss'],
})
export class DetailScreenFieldConfigComponent implements OnInit {
    dataSource: any = {
        value: []
    };
    KEYStatic: any = {
        HEADER: [],
        ITEMS: []
    };
    item = FormatDetailList.listItem;
    change = true;
    items: any = [];
    popupData: any;
    constData: any = {};
    popupVisible: any = false;
    buttonOptions: any = {
        text: "Save",
        useSubmitBehavior: true
    };

    tab = FormatDetailList.listTab;
    type = FormatDetailList.listType.map(item => item.toUpperCase());
    popupLang: boolean = false;
    popupDataLang: any = {};

    deleteAction = FormatDetailList.listDeleteAction;

    actionWord = FormatDetailList.listWordAction;

    @ViewChildren(DxDataGridComponent) dataGrids: QueryList<DxDataGridComponent> | any;

    ovsIsActive: boolean = false;
    ovsAction: string = '';
    ovsKey: string = '';
    ovsData: OVS_INTERFACE;


    constructor(
        private detail: DetailScreenFieldConfigService
    ) {}

    ngOnInit() {
        this.dataSource.value = new DataSource({
            store: new CustomStore({
                load: () => {
                    return this.detail.getDetail()
                        .toPromise()
                        .then(([ { data, items } , { HEADER, ITEMS} ]: any): any => {

                            this.KEYStatic.HEADER = HEADER;
                            this.KEYStatic.ITEMS = ITEMS;
                            this.constData = data;
                            this.items = items ? items : [];

                            this.getDataItemALL();

                            return {
                                data: items ? items : [],
                                totalCount: items ? items.length : 0
                            };
                        })
                        .catch(() => ({data: [], totalCount: 0}))
                },
            }),
            paginate: true,
        });
    }

    getDataItem = ({ data_name }: any) => this.KEYStatic[data_name] ? this.KEYStatic[data_name] : [];

    getDataItemALL() {

        let { HEADER, ITEMS } = JSON.parse(JSON.stringify(this.KEYStatic));
        if (!this.items) return;

        this.items.forEach(({ KEY }: any) => {
            if (!KEY) return;
            HEADER = HEADER.filter((head: any) => this.getIndex('HEADER', head, KEY) < 0);
            ITEMS  = ITEMS.filter((head: any) => this.getIndex('ITEMS', head, KEY) < 0)
        });

        this.items = this.items.map((item: any) => {
            if (item.data_name == "HEADER") {
                item.HEADER = [...HEADER];
                item.HEADER.push(item.KEY)
            }
            if (item.data_name == "ITEMS") {
                item.ITEMS = [...ITEMS];
                item.ITEMS.push(item.KEY)
            }
            return item;
        });

    }

    getIndex = (type: any, item: any, data: any) => data.indexOf(item);

    getSelectedItemsKeys(items: any) {

        let result: any = [];

        items.forEach(({ selected, text, items }: any) => {
            selected && result.push(text);
            items.length ? result = result.concat(this.getSelectedItemsKeys(items)) : null;
        });

        return result;
    }

    treeView_itemSelectionChanged(e: any, data: any, type: any) {
        const nodes = e.component.getNodes();
        this.findData(data, type, this.getSelectedItemsKeys(nodes));
    }

    changeData = ({ value }: any, data: any, type: any, input: any = null) => {
        this.findData(data, type, value);
        type === "KEY" && this.getDataItemALL();
        input && type === "KEY" && this.getError(data, "KEY", value)
    };

    getError({ id }: any, type: any, value: any) {

        let { KEY, error } = this.items.find((item: any) => item.id === id);

        if (KEY === value) {
            error = {};
            error.KEY = true;
        } else {
            error = {};
        }
    }

    findData(data: any, type: any, value: any) {

        let changeData = this.items.find((item: any) => item.id === data.id);

        if (changeData) {
            changeData[type] = value;
        }
        data[type] = value;
        type === "REQD" && value && (changeData && (changeData[type] = 'X'), data && (data[type] = 'X'));
    }

    getCssClass = ({ error }: any, type: any) => error && error[type] ? 'errorCell' : '';

    onToolbarPreparing(e: any) {
        e.toolbarOptions.items.unshift(
            {
                location: 'after',
                widget: 'dxButton',
                options: {
                    hint: 'Add new Part',
                    icon: 'add',
                    onClick: this.addRow.bind(this)
                }
            },
        );
    }

    addRow() {
        this.popupData = new TypeRowInterface();
        this.popupData.data_name = this.item[0];
        this.popupData.DESCRIPTION_TRANSLATE = [];
        this.popupData.id = this.detail.uuid(this.detail.makeWordRandom(20));
        this.popupVisible = true
    }

    private reformateData = (arr1:any,arr2:any) => {

        this.actionWord
            .forEach((vis:any) => {
                if(arr1) {
                    let index1 = arr1.indexOf(vis.name);
                    index1 > -1 && arr1[index1] && (arr1[index1] = vis.value)
                }
                if(arr2) {
                    let index2 = arr2.indexOf(vis.name);
                    index2 > -1 && arr2[index2] && (arr2[index2] = vis.value)
                }
            });

    };

    CreateRow(type: string) {

        type == "CREATE" && this.items.push(this.popupData);

        this.items = this.items.map((item: any) => {

            item.LABELS = {};
            item.LABEL ? item.LABELS.LABEL = item.LABEL : null;
            item.TOOLTIP ? item.LABELS.TOOLTIP = item.TOOLTIP : null;

            this.reformateData(item.VISIBLE, item.READONLY);

            this.deleteAction.forEach(deleted => item[deleted] && delete item[deleted]);

            item.DESCRIPTION_TRANSLATE = item.DESCRIPTION_TRANSLATE.map((lang:any) => {
                lang.nestedId && delete lang.nestedId;
                return lang
            });

            return item;
        });

        let data: any = {};

        data.HEADER = [];
        data.ITEMS = [];

        this.items.forEach((item: any) => {
            if (item.data_name === 'HEADER') {
                item.data_name && delete item.data_name;
                data.HEADER.push(item)
            }
            if (item.data_name === 'ITEMS') {
                item.data_name && delete item.data_name;
                data.ITEMS.push(item)
            }
        });

        this.constData && delete this.constData._id;

        data = {
            ...this.constData,
            ...data
        };
        return this.detail.updateDetail(data)
            .subscribe(() => {
                    MessageToast.showSuccess(`${type} row data`, 2000);
                    this.popupVisible = false;
                    this.dataGrids._results.forEach((dataGrid:any) => dataGrid.instance.refresh())
                },
                ({message}) => MessageToast.showError(
                    `${message ? message : `Failed to ${type} the record`}`,
                    10000));

    }

    deleteDataRow(data: any) {
        confirm('Delete this row data?', '')
            .then(res => {
                if (res) {
                    let findItem;
                    this.items.find((item: any, index: any) => {
                        if (item.id === data.data.id) {
                            findItem = index.toString();
                            return true;
                        } else return false
                    });
                    findItem && this.items.splice(Number(findItem), 1);
                    this.CreateRow("DELETE")
                }
            });
    }

    save = () => this.CreateRow("EDIT");

    syncTreeViewSelection(e: any, { id }: any, type: any) {

        const rowItem = this.items.find((item: any) => item.id === id);

        if (rowItem && rowItem[type]) rowItem[type] = rowItem[type].map((item: any) => {
            item.selected = false;
            return item;
        })

    }

    onToolbarPreparingCustom(e: any, { id }: any) {
        const arrayButton = [
            {
                widget: "dxButton",
                options: {
                    hint: 'Add',
                    icon: "add", onClick: () => {
                        this.popupDataLang = {};
                        this.popupDataLang.id = id;
                        this.popupLang = true;
                    }
                },
                location: "after"
            },
        ];

        e.toolbarOptions.items = [...arrayButton, ...e.toolbarOptions.items];
    }

    CreateRowInLangTable(inCreatePopub:any = false) {
        let changeData = this.items.find((item: any) => item.id === this.popupDataLang.id);

        this.popupData && (changeData = this.popupData);

        this.popupDataLang.id && delete this.popupDataLang.id;

        this.popupDataLang.nestedId = this.detail.uuid(this.detail.makeWordRandom(20));

        if (changeData) {
            Array.isArray(changeData.DESCRIPTION_TRANSLATE)
                ? changeData.DESCRIPTION_TRANSLATE.push(this.popupDataLang)
                : (changeData.DESCRIPTION_TRANSLATE = [], changeData.DESCRIPTION_TRANSLATE.push(this.popupDataLang))
        }

        this.popupDataLang = {};
        this.popupLang = false;
    }

    changeDataNested(e: any, { id }: any, { nestedId }:any, type: any, flag:any = null) {

        let changeData = this.items.find((item: any) => item.id === id);

        flag && (changeData = flag);

        if(changeData) {
            let DESCRIPTION = changeData.DESCRIPTION_TRANSLATE
                .find((item: any) => item.nestedId === nestedId);
            DESCRIPTION && (DESCRIPTION[type] = e.value)
        }
    }

    deleteNestedItem({ id }: any, { nestedId }:any, flag:any = null){
        confirm('Delete this row lang?', '')
            .then(res => {
                if(res) {
                    let changeData = this.items.find((item: any) => item.id === id);
                    flag && (changeData = flag);
                    if(changeData) {
                        let indexMain = null;
                        changeData.DESCRIPTION_TRANSLATE
                            .find((item: any, index:any) => {
                                const dataFind = item.nestedId === nestedId;
                                dataFind && (indexMain = index.toString());
                                return dataFind
                            });
                        indexMain && changeData.DESCRIPTION_TRANSLATE.splice(Number(indexMain), 1)
                    }
                }
            });

    }

    //////////////////////////////////////////////////
    // OVS
    //////////////////////////////////////////////////

    openPopubWithData({ OVS , id }: any){

        this.ovsIsActive = false;
        this.ovsAction = OVS ? 'update' : 'add';
        this.ovsKey = id;
        this.ovsData = OVS ;

        setTimeout(() => this.ovsIsActive = true, 1)
    }

    saveOvs(data: any){
        this.ovsIsActive = false;

        let changeData = this.items.find((item: any) => item.id === data.hash);

        data.hash && delete data.hash;
        changeData && (changeData.OVS = data);
    }
}
