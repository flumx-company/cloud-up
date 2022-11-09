import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import {HitlistVariantService} from "../_service/hitlist.variant.service";
import {MessageToast} from "../../../../shared/helpers/message-toast";
import {DxDataGridComponent} from "devextreme-angular";

@Component({
    selector: 'app-conditions-home',
    templateUrl: './hitlist-variant.component.html',
    styleUrls: ['./hitlist-variant.component.css']
})

export class HitlistVariantComponent implements OnInit {
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    dataSource: any = {
        value: []
    };
    KEY: any = {
        HEADER_PTS_MODEL: [],
        HEADER_CONFIG: [],
        static: {}
    };
    item = ['HEADER', 'ITEMS'];
    change = true;
    items: any = [];
    popupData: any = {
        FIELD_TYPE:"FIELDS",
        ACTIVE:false
    };

    popupVisible: any = false;
    buttonOptions: any = {
        text: "Save",
        useSubmitBehavior: true
    };
    type = ['Date', 'String', 'Line_Breack'].map(item => item.toUpperCase());

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private SearchVariant: HitlistVariantService) {
        this.dataSource.value = new DataSource({
            store: new CustomStore({
                load: (params) => this.SearchVariant.getVariant()
                    .toPromise()
                    .then((data) => {
                        this.items = JSON.parse(JSON.stringify(data.items));
                        this.KEY.static = {...data.static};
                        this.KEY.static._id && delete this.KEY.static._id;
                        this.KEY.HEADER_PTS_MODEL = [...data.ptsModel['HEADER']];
                        this.KEY.HEADER_CONFIG = ['HEADER', 'ITEMS'];
                        return {
                            data: data.items.splice(
                                params && params.skip ? params.skip : 0,
                                params && params.take ? params.take : data.items.length
                            ), totalCount: data.items.length
                        };
                    })
                    .catch(() => ({data: [], totalCount: 0}))
            })
        });
    }

    getSelectedItemsKeys(items: any) {
        let result: any = [];
        items.forEach((item: any) => {
            item.selected && result.push(item.text);
            item.items.length ? result = result.concat(this.getSelectedItemsKeys(item.items)) : null;
        });
        return result;
    }

    getCssClass = (data: any, type: any) => data && data.error && data.error[type] ? 'errorCell' : '';

    // treeView_itemSelectionChanged(e: any, data: any, type: any) {
    //     const nodes = e._component.getNodes();
    //     this.findData(data, type, this.getSelectedItemsKeys(nodes));
    // }

    changeData = (e: any, data: any, type: any, input: any = null) => {
        this.findData(data, type, e.value);
        // type === "KEY" && this.getDataItemALL();
        // input && type === "KEY" && this.getError(data, "KEY",  e.value)
    };

    findData(data: any, type: any, value: any) {
        let changeData = this.items.find((item: any) => item.id === data.id);
        changeData && (changeData[type] = value);
        data[type] = value;
    }

    // getError(data: any, type: any, value: any) {
    //     let changeData = this.items.find((item: any) => item.id === data.id);
    //     if (changeData && changeData.KEY === value) {
    //         changeData.error = {};
    //         changeData.error.KEY = true;
    //     } else {
    //         changeData.error = {};
    //     }
    // }

    onToolbarPreparing(e: any) {
        e.toolbarOptions.items.unshift(
            {
                location: 'after',
                widget: 'dxButton',
                options: {
                    hint: 'Add new Part',
                    icon: 'add',
                    onClick: () => this.popupVisible = true
                }
            },
        );
    }

    ngOnInit() {
    }

    deleteDataRow(data:any){
        let indexMain;
        let changeData = this.items.find((item: any, index:any) => {
            const find = item.id === data.key.id;
            find && (indexMain = index);
            return find
        });
        changeData && this.items.splice(indexMain, 1);
        this.save('delete')
    }

    save(type:string){
        let dataArray = JSON.parse(JSON.stringify(this.items));
        let dataStatic = JSON.parse(JSON.stringify(this.KEY.static));
        dataStatic.RESULT_FIELD_CONFIGS = [];
        dataArray = dataArray.map((item:any) => {
            item.id && delete item.id;
            item.LABELS_TRANSLATE = [{LANG:item.LABELS_TRANSLATE,VALUES:[{LABEL:''}]}];
            return item
        });
        dataArray.forEach((data:any) => {
            let item_variant = dataStatic.RESULT_FIELD_CONFIGS.find((item:any) => item && item.VARIANT == data.VARIANT);
            !item_variant && dataStatic.RESULT_FIELD_CONFIGS.push({VARIANT:data.VARIANT, [data.TYPE_OBJECT]: []});
            item_variant = dataStatic.RESULT_FIELD_CONFIGS.find((item:any) => item && item.VARIANT == data.VARIANT);
            item_variant && item_variant[data.TYPE_OBJECT] && item_variant[data.TYPE_OBJECT].push(data);
        });
        this.SearchVariant.updateVariant(dataStatic)
            .subscribe(() => {
                    this.popupVisible = false;
                    this.dataGrid.instance.refresh();
                    MessageToast.showSuccess(`Successfully ${type}`)
                },
                error => console.log(error))
    }
    create(type:string){
       this.items.push(this.popupData);
       this.save(type)
    }
}
