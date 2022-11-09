import {Component, OnInit, ViewChild} from '@angular/core';
import {DxDataGridComponent} from 'devextreme-angular';
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from '@angular/router';

import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';

import "rxjs/add/operator/max";



import {confirm} from "devextreme/ui/dialog";
import {InfoPopupComponent} from "../../../../../shared/components/info-popup/info-popup.component";
import {DataGridUtil} from "../../../../../shared/helpers/data-grid-util";
import {MessageToast} from "../../../../../shared/helpers/message-toast";
import {RecordTypeService} from "../../_service/record.type.service";




@Component({
    selector: 'record-type-detail',
    templateUrl: './record-type-detail.component.html',
    styleUrls: ['./record-type-detail.component.scss']
})

export class RecordTypeDetailComponent  {
    @ViewChild(InfoPopupComponent) infoPopup?: InfoPopupComponent;
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    customizeColumns = DataGridUtil.customizeColumns;
    currency: any;
    currencyStatic:any;
    currencyOneStatic:any;
    viewMode:any;
    count: number = 0;
    viewName:any;
    record: any = [];
    defaults:any = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private sourceService: RecordTypeService
    ) {
        const routerParams$ = this.route.params;

        routerParams$.subscribe((next:any) => {

            this.viewMode = next['mode'];
            this.viewName = next['index'];

            this.currency = new DataSource({
                store: new CustomStore({
                    load: () => {
                        return this.sourceService.getRecordDocument()
                            .toPromise()
                            .then((data: any) => {

                                if(!this.currencyOneStatic){
                                    this.currencyStatic = data;
                                    this.currencyOneStatic = this.viewMode !== 'add' ? data.TYPES[Number(this.viewName)]
                                        : {
                                            DESCRIPTIONS:[],
                                            VALUE: ''
                                        };
                                }
                                this.currencyOneStatic.DESCRIPTIONS = this.currencyOneStatic.DESCRIPTIONS
                                    .map((item:any, index:any) => {
                                        item.index = index;
                                        return item;
                                    });

                                if(this.viewMode == 'add') {
                                    return this.sourceService.test(this.currencyOneStatic.DESCRIPTIONS)
                                        .then((res:any) :any => res)
                                } else {
                                    if (this.count) {
                                        return this.sourceService.test(this.currencyOneStatic.DESCRIPTIONS)
                                            .then((res: any): any => res)
                                    }
                                }

                                this.count = 1;

                                return {
                                    data: this.currencyOneStatic.DESCRIPTIONS ? this.currencyOneStatic.DESCRIPTIONS: [],
                                    totalCount: this.currencyOneStatic.DESCRIPTIONS ?
                                        this.currencyOneStatic.DESCRIPTIONS.length : 0
                                };
                            })
                            .catch((error:any) => {
                                MessageToast.showError(error.error.MESSAGE);
                                return {data: [], totalCount: 0};
                            });

                    },
                    insert: (values: any) => {

                        this.currencyOneStatic.DESCRIPTIONS.push({
                            DESCRIPTION:values.DESCRIPTION,
                            LANG:values.LANG,
                            index: this.currencyOneStatic.DESCRIPTIONS.length
                        });

                        MessageToast.showSuccess('Successfully added Language');
                        return this.sourceService.test(this.currencyOneStatic.DESCRIPTIONS)
                            .then((res:any) :any => {
                                this.dataGrid.instance.refresh()
                                return res
                            })
                    },
                    update: (key: any, values: any) => {

                        let indexEdit:string = '';
                        const obj = {...key};

                        this.currencyOneStatic.DESCRIPTIONS.forEach((res:any,index:any) => {
                            res.index == key.index && (indexEdit = index);
                        });

                        Object.keys(values).forEach(item => obj[item] = values[item]);
                        indexEdit.toString() && this.currencyOneStatic.DESCRIPTIONS
                            .splice(Number(indexEdit), 1, obj);

                        MessageToast.showSuccess('Language edited successfully');

                        return this.sourceService.test(this.currencyOneStatic.DESCRIPTIONS)
                            .then((res:any) :any => {
                                this.dataGrid.instance.refresh()
                                return res
                            })
                    },
                    remove: (obj: any) => {

                        let indexEdit:string = '';
                        this.currencyOneStatic.DESCRIPTIONS.forEach((res:any,index:any) => {
                            res.index == obj.index ? indexEdit = index: null;
                        });

                        indexEdit.toString() && this.currencyOneStatic.DESCRIPTIONS.splice(Number(indexEdit),1);

                        MessageToast.showSuccess('Successfully removed Language');

                        return this.sourceService.test(this.currencyOneStatic.DESCRIPTIONS)
                            .then((res:any) :any => {
                                this.dataGrid.instance.refresh()
                                return res
                            })
                    }
                })
            });
        })
    }


    saveCondition(){

        let data = {...this.currencyOneStatic};

        data.DESCRIPTIONS= data.DESCRIPTIONS.map((res:any) => {
            res.index && delete res.index;
            return res;
        });

        if(!data.TYPE || data.DESCRIPTIONS.length < 1) {
            !data.TYPE && MessageToast.showError("Record is required");
            data.DESCRIPTIONS.length < 1 && MessageToast.showError("Description is required");
            return;
        }
        this.currencyStatic._id && delete this.currencyStatic._id;
        if(this.viewMode == 'add') {

            this.currencyStatic.TYPES.push(data);
            this.sourceService.putRecordValues(this.currencyStatic)
                .then(() => this.router.navigateByUrl('configuration/field-configuration/record-types'))
                .catch((err:any) => MessageToast.showError(err.error ? err.error.MESSAGE : 'Error add'))
        } else {
            this.currencyStatic.TYPES.splice(Number(this.viewName), 1, data)
            this.sourceService.putRecordValues(this.currencyStatic)
                .then(() => this.router.navigateByUrl('configuration/field-configuration/record-types'))
                .catch((err:any) => MessageToast.showError(err.error ? err.error.MESSAGE : 'Error update'))
        }
    }




    onToolbarPreparingCustom(e: any) {
        const arrayButton = [
            {
                widget: "dxButton",
                options: {
                    hint: 'Add',
                    icon: "add", onClick: () => this.dataGrid.instance.addRow()
                },
                location: "after"
            },
            {
                widget: "dxButton",
                options: {
                    hint: 'Refresh',
                    icon: "refresh", onClick: ()  => {
                        this.count = 0;
                        e.component.refresh()
                    }
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

    sortingValue = (event: any) => event.value == null && this.dataGrid.instance.refresh();

    click_in_Icon(e: any, name: string) {
        name === 'edit'   && this.dataGrid.instance.editRow(e.rowIndex);
        name === 'delete' && this.dataGrid.instance.deleteRow(e.rowIndex);
        name === 'add'    && this.dataGrid.instance.addRow();
    }

    navBack = () => confirm('Continue without saving?', '').then(res => res && this.location.back());

}
