import {Component, ViewChild} from '@angular/core';
import {Router} from "@angular/router";

import {DxDataGridComponent} from 'devextreme-angular/ui/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';

import {InfoPopupComponent} from '../../../../../shared/components/info-popup/info-popup.component';
import {DataGridUtil} from "../../../../../shared/helpers/data-grid-util";
import {ValidationRulesService} from "../../services/validation-rules.service";
import {MessageToast} from "../../../../../shared/helpers/message-toast";



@Component({
    selector: 'validations-home',
    templateUrl: './validation-rules-home.component.html',
    styleUrls: ['./validation-rules-home.component.scss']
})

export class ValidationRulesHomeComponent {

    @ViewChild(InfoPopupComponent) infoPopup?: InfoPopupComponent;
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    customizeColumns = DataGridUtil.customizeColumns;

    dataRecord: any = {
        value: DataSource,
        obj: {},
        staticArray: []
    };

    constructor(
        private recordTypeService: ValidationRulesService,
        private router: Router,
    ) {
        this.dataRecord.value = new DataSource({
            store: new CustomStore({
                load: ({ skip, take }: any) => {

                    return this.recordTypeService.getRules()
                        .then((data: any) => {
                            return {
                                data: data ? data.RULES.splice(skip || 0, take || data.RULES.length) : [],
                                totalCount:  data.RULES.length
                            };
                        })
                        .catch(({ error }: any) => {
                            MessageToast.showError(error ? error.MESSAGE : 'Error');
                            return {data: [], totalCount: 0};
                        });

                },
                remove: (obj: any) => {
                    return this.recordTypeService.deleteRules(obj)
                        .toPromise()
                        .then(() => {
                            MessageToast.showSuccess('Successfully remove record');
                            this.dataGrid.instance.refresh();
                        })
                        .catch(({error}:any) => {
                            MessageToast.showError(error ? error.MESSAGE : 'Error remove');
                            return {data: [], totalCount: 0};
                        });

                }
            })
        })

    }


    onToolbarPreparingCustom(e: any) {
        const arrayButton = [
            {
                widget: "dxButton",
                options: {
                    hint: 'Add',
                    icon: "add", onClick: () => this.router
                        .navigateByUrl(`configuration/validations/validation-rules/add`)
                },
                location: "after"
            },
            {
                widget: "dxButton",
                options: {
                    hint: 'Refresh',
                    icon: "refresh", onClick: ({ component }:any) => component.refresh()
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

    buttonAdd = ({ row }: any) => !row.data.Pred;

    sortingValue = ({ value }: any) => !value && this.dataGrid.instance.refresh();

    click_in_Icon({ key, rowIndex }: any, name: string) {
        name === 'edit' && this.router
            .navigateByUrl(`configuration/validations/validation-rules/edit/${rowIndex}`);
        name === 'delete' && this.dataGrid.instance.deleteRow(rowIndex);
        name === 'add' && this.dataGrid.instance.addRow();
    }

}
