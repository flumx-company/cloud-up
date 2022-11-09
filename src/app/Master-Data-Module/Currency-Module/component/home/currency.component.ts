import {Component,ViewChild} from '@angular/core';
import {DxDataGridComponent} from 'devextreme-angular';
import { Router} from '@angular/router';

import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';

import {InfoPopupComponent} from '../../../../shared/components/info-popup/info-popup.component';
import {DataGridUtil} from "../../../../shared/helpers/data-grid-util";
import {CurrencyService} from "../../_service/currency.service";
import {MessageToast} from "../../../../shared/helpers/message-toast";

import {BehaviorSubject} from "rxjs";

@Component({
    selector: 'record-type-home',
    templateUrl: './currency.component.html',
    styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent{
    @ViewChild(InfoPopupComponent) infoPopup?: InfoPopupComponent;
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    @ViewChild(DxDataGridComponent) datagrid2: DxDataGridComponent;
    customizeColumns = DataGridUtil.customizeColumns;
    currency: any = [];
    orderLangFilter:any = [];
    orderTextFilter:any = [];
    defLength:any = [];
    private _defLength2:any = '';

    constructor(
        private CurrencyService: CurrencyService,
        private router: Router
    ) {
        this.defLength2 = navigator.language.split('-')[0].toUpperCase();

        this.currency = new DataSource({
            store: new CustomStore({
                load: (loadOptions: any) => {
                    return this.CurrencyService.getCurrency()
                        .toPromise()
                        .then((data: any) => {

                            data = data.map((item:any) => {

                                let obj:any = {
                                    LANG: [],
                                    TEXT: []
                                };
                                let array_count:any = [];
                                item.status = item.DESCRIPTION.length > 0;
                                item.DESCRIPTION.forEach((itemDesc:any) => {
                                    Object.keys(itemDesc).forEach(data => {
                                        data == "LANG" && obj.LANG.push(itemDesc.LANG);
                                        data == 'VALUES' && obj.TEXT.push(itemDesc.VALUES.TEXT)
                                    })
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
                                        obj.TEXT.splice(Number(count), 1);
                                    });
                                item.DESCRIPTION.LANG = obj.LANG.join(',');
                                item.DESCRIPTION.TEXT = obj.TEXT.join(',');
                                return item;
                            });

                            this.defLength = [];
                            const action = [{
                                varieble:'orderLangFilter',
                                name: 'LANG'
                            },{
                                varieble:'orderTextFilter',
                                name: 'TEXT'
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
                        .catch(({ error } :any) => {
                            // MessageToast.showError(
                            //     error &&error.MESSAGE ?error.MESSAGE : 'Error'
                            // );
                            return {data: [], totalCount: 0};
                        });
                },
                remove: (obj: any) => {
                    return this.CurrencyService.deleteCurrency(obj.CURRENCY)
                        .toPromise()
                        .then(() => {
                            MessageToast.showSuccess('Currency removed successfully  ');
                            this.dataGrid.instance.refresh();
                            return false;
                        })
                        .catch(({ error }:any) => {
                            MessageToast.showError(
                                error && error.MESSAGE ? error.MESSAGE : 'Error'
                            );
                            return false;
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

    onToolbarPreparingCustom(e: any) {
        const arrayButton = [
            {
                widget: "dxButton",
                options: {
                    hint: 'Add',
                    icon: "add", onClick: () => this.router.navigateByUrl('master-data/currency/add')
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
        ];

        e.toolbarOptions.items = [...arrayButton, ...e.toolbarOptions.items];
    }

    customizeExcelCell(options:any){
        const grid =   options.gridCell;
        const column = grid && grid.column;
        const data =   grid && grid.data;
        let toStr = (arr:any, name:any) => [arr].map((item:any) => item[name]).join(',\n');
        if(grid && column){
            if(column.caption === 'Language' ){
                if(data) grid.value = toStr(data.DESCRIPTION, 'LANG');
                if(data) options.value = toStr(data.DESCRIPTION, 'LANG');
            }
            if(column.caption === 'Text' ){
                if(data) grid.value = toStr(data.DESCRIPTION, 'TEXT');
                if(data) options.value = toStr(data.DESCRIPTION, 'TEXT');
            }
        }

    }

    buttonAdd = (e: any) => !e.row.data.Pred;

    sortingValue = (event: any) => {
         event.fullName == "columns[1].filterValue" && this.dataGrid.instance.refresh();
         event.value == null && this.dataGrid.instance.refresh();
    }

    click_in_Icon(e: any, name: string) {
        name === 'edit'   && this.router.navigateByUrl(`master-data/currency/edit/${e.key.CURRENCY}`);
        name === 'delete' && this.dataGrid.instance.deleteRow(e.rowIndex);
        name === 'add'    && this.router.navigateByUrl(`master-data/currency/add`)
    }
}
