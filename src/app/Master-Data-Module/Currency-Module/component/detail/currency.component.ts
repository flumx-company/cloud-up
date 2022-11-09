import {Component, OnInit, ViewChild} from '@angular/core';
import {DxDataGridComponent} from 'devextreme-angular';
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from '@angular/router';

import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';

import "rxjs/add/operator/max";

import {CurrencyService} from "../../_service/currency.service";

import {CURRENCY, Descriptions, Values} from "../../interface/currency.interface";

import {confirm} from "devextreme/ui/dialog";

import {DataGridUtil} from "../../../../shared/helpers/data-grid-util";
import {InfoPopupComponent} from "../../../../shared/components/info-popup/info-popup.component";
import {MessageToast} from "../../../../shared/helpers/message-toast";

@Component({
    selector: 'record-type-home',
    templateUrl: './currency.component.html',
    styleUrls: ['./currency.component.scss']
})

export class CurrencyDetailComponent implements OnInit {
    @ViewChild(InfoPopupComponent) infoPopup?: InfoPopupComponent;
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    customizeColumns = DataGridUtil.customizeColumns;
    currency: any;
    currencyStatic:any;
    viewMode:any;
    count: number = 0;
    viewName:any;
    record: any = [];
    defaults:any = '';

    constructor(
        private CurrencyService: CurrencyService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
    ) {
        this.currencyStatic                 = new CURRENCY();
        this.currencyStatic.CURRENCY        = new Values();
        this.currency = this.currencyStatic.CURRENCY.DESC_TRANSLATE
    }


    saveCondition(){
        let data = {...this.currencyStatic};
        data._id && delete data._id;
        data.CURRENCY.DESC_TRANSLATE = this.currencyStatic.CURRENCY.DESC_TRANSLATE.map((res:any) => {
            res.index && delete res.index;
            return res;
        });

        if(!data.CURRENCY.ISOCD || data.CURRENCY.DESC_TRANSLATE.length < 1) {
            !data.CURRENCY.ISOCD && MessageToast.showError("ISOCD is required");
            data.CURRENCY.DESC_TRANSLATE.length < 1 &&MessageToast.showError("Description is required");
            return;
        }
        if(this.viewMode == 'add') {
            this.CurrencyService.setCurrency(data)
                .toPromise()
                .then(() => this.router.navigateByUrl('master-data/currency'))
                .catch((err:any) => MessageToast.showError(err.error ? err.error.MESSAGE : 'Error add'))
        } else {
            this.CurrencyService.putCurrency(data.CURRENCY.ISOCD, data)
                .toPromise()
                .then(() => this.router.navigateByUrl('master-data/currency'))
                .catch((err:any) => MessageToast.showError(err.error ? err.error.MESSAGE : 'Error update'))
        }
    }


    ngOnInit() {
        const routerParams$ = this.route.params;

        routerParams$.subscribe((next:any) => {

            this.viewMode = next['mode'];
            this.viewName = next['index'];

            this.currency = new DataSource({
                store: new CustomStore({
                    load: () => {
                        if(this.viewMode == 'add') {
                            return this.CurrencyService.test(this.currencyStatic.CURRENCY)
                                .then((res:any) :any => res)
                        } else {
                            if(this.count) {
                                return this.CurrencyService.test(this.currencyStatic.CURRENCY)
                                    .then((res:any) :any => res)
                            }
                            return this.CurrencyService.getOneCurrency(this.viewName)
                                .toPromise()
                                .then((data: any) => {

                                    this.currencyStatic = data;

                                    data.CURRENCY.DESC_TRANSLATE = data.CURRENCY.DESC_TRANSLATE.map((item:any, index:any) => {
                                        item.index = index;
                                        return item;
                                    });

                                    this.count = 1;

                                    return {
                                        data:  data
                                        && data.CURRENCY
                                        && data.CURRENCY.DESC_TRANSLATE ? data.CURRENCY.DESC_TRANSLATE : [],
                                        totalCount: data
                                        && data.CURRENCY
                                        && data.CURRENCY.DESC_TRANSLATE ? data.CURRENCY.DESC_TRANSLATE.length : 0
                                    };
                                })
                                .catch(({ error }: any) => {
                                    // MessageToast.showError(error.MESSAGE ? error.MESSAGE : 'Error get data');
                                    return {data: [], totalCount: 0};
                                });
                        }
                    },
                    insert: (values: any) => {
                        let array:any = [...this.currencyStatic.CURRENCY.DESC_TRANSLATE];
                        array = array
                            .map((item:any) => item.index);
                        array
                            .push(this.currencyStatic.CURRENCY.DESC_TRANSLATE.length + 1);

                        values.__KEY__ && delete values.__KEY__
                        this.currencyStatic.CURRENCY.DESC_TRANSLATE.push(new Descriptions({
                            ...values,
                            index: array.length == 0 ? 0 : this.getAvailableCondition(array)
                        }));

                        MessageToast.showSuccess('Successfully added Language');
                        return this.CurrencyService.test(this.currencyStatic.CURRENCY)
                            .then((res:any) :any => {
                                this.defaults = '';
                                return res
                            })
                    },
                    update: (key: any, values: any) => {

                        let indexEdit:string = '';
                        const obj = {...values, index: key.index};

                        this.currencyStatic.CURRENCY.DESC_TRANSLATE.forEach((res:any,index:any) => {
                            res.index == key.index && (indexEdit = index);
                        });

                        indexEdit.toString() && this.currencyStatic.CURRENCY.DESC_TRANSLATE
                            .splice(Number(indexEdit), 1, obj);

                        MessageToast.showSuccess('Language edited successfully');

                        return this.CurrencyService.test(this.currencyStatic.CURRENCY)
                            .then((res:any) :any => res)
                    },
                    remove: (obj: any) => {
                        let indexEdit:string = '';
                        this.currencyStatic.CURRENCY.DESC_TRANSLATE.forEach((res:any,index:any) => {
                            res.index == obj.index ? indexEdit = index: null;
                        });

                        indexEdit.toString() && this.currencyStatic.CURRENCY.DESC_TRANSLATE.splice(Number(indexEdit),1);

                        MessageToast.showSuccess('Successfully removed Language');

                        return this.CurrencyService.test(this.currencyStatic.CURRENCY)
                            .then((res:any) :any => res)
                    }
                })
            });
        })
    }

    getAvailableCondition(res:any) : number{
        const MAX = Math.max(...res);
        res.push(0);
        const New_array = Array
            .from(Array(MAX).keys())
            .filter(item => res.indexOf(item) == -1);
        return New_array.length == 0 ? MAX + 1 : Math.min(...New_array);
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
