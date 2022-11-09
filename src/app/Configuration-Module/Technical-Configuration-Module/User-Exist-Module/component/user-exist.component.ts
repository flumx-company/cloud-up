import {Component, ViewChild} from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import {InfoPopupComponent} from '../../../../shared/components/info-popup/info-popup.component';
import {DataGridUtil} from '../../../../shared/helpers/data-grid-util';
import {MessageToast} from '../../../../shared/helpers/message-toast';
import {DxDataGridComponent} from "devextreme-angular/ui/data-grid";

import {UserExistService} from "../_service/user.exist.service";

@Component({
    selector: 'app-isas-home',
    templateUrl: './user-exist.component.html',
    styleUrls: ['./user-exist.component.css']
})
export class UserExistComponent {
    @ViewChild(InfoPopupComponent) infoPopup?: InfoPopupComponent;
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

    dataUserExist: any = {
        value: DataSource,
        obj: {},
        staticArray: []
    };
    customizeColumns = DataGridUtil.customizeColumns;

    constructor(
        private isasSourceService: UserExistService
    ) {

        this.dataUserExist.value = new DataSource({
            store: new CustomStore({
                load: (loadOptions: any) => {
                    return this.isasSourceService.getUserExistDocument()
                        // .toPromise()
                        .then((data: any) => {

                            this.dataUserExist.obj = {...data};
                            delete this.dataUserExist.obj.USERS;

                            data.USERS = data.USERS.map((item: any, index: any) => {
                                item.key = index;
                                item.LANG = item.DESCRIPTIONS[0].LANG.slice(0);
                                item.DESCRIPTIONS = item.DESCRIPTIONS[0].DESCRIPTION.slice(0);
                                return item;
                            });

                            this.dataUserExist.staticArray = [...data.USERS];
                            const length = data.USERS.length;

                            return {
                                data:       data ? data.USERS.splice(
                                    loadOptions && loadOptions.skip ? loadOptions.skip : 0,
                                    loadOptions && loadOptions.take ? loadOptions.take : length
                                ) : [],
                                totalCount: data && data.USERS ? data.TYPES.length : 0
                            };
                        })
                        .catch(error => {
                            MessageToast.showError(error.error ? error.error.MESSAGE : 'Error get data');
                            return {data: [], totalCount: 0};
                        });
                },
                insert: (values: any) => {

                    const array = [...this.dataUserExist.staticArray];

                    array.unshift(values);

                    const data = this.mutationArray(array);

                    return this.isasSourceService.putUserExistValues(data)
                        // .toPromise()
                        .then(() => {
                            this.dataGrid.instance.refresh();
                            MessageToast.showSuccess('Successfully add user');
                            return false
                        })
                        .catch(error => {
                            console.log(error);
                            MessageToast.showError(error.error ? error.error.MESSAGE : 'Error add item');
                            return false
                        });
                },
                update: (key: any, values: any) => {
                    const obj = {...key};
                    Object.keys(values).forEach(item => obj[item] = values[item]);

                    const array = [...this.dataUserExist.staticArray];
                    array.splice(obj.key , 1, obj);

                    const data = this.mutationArray(array);

                    return this.isasSourceService.putUserExistValues(data)
                        // .toPromise()
                        .then((data: any) => {
                            this.dataGrid.instance.refresh();
                            MessageToast.showSuccess('Successfully edit user');
                            return {
                                data:       data ? data.USERS : [],
                                totalCount: data && data.USERS ? data.USERS.length : 0
                            };
                        })
                        .catch(error => {
                            MessageToast.showError(error.error ? error.error.MESSAGE : 'Error update item');
                            return {data: [], totalCount: 0};
                        });
                },
                remove: (obj: any) => {

                    const array = [...this.dataUserExist.staticArray];
                    array.splice(obj.key, 1);

                    let data = this.mutationArray(array);

                    return this.isasSourceService.putUserExistValues(data)
                        // .toPromise()
                        .then((data: any) => {
                            this.dataGrid.instance.refresh();
                            MessageToast.showSuccess('Successfully remove user');
                            return {
                                data:       data ? data.USERS : [],
                                totalCount: data && data.USERS ? data.USERS.length : 0
                            };
                        })
                        .catch(error => {
                            MessageToast.showError(error.error ? error.error.MESSAGE : 'Error remove item');
                            return {data: [], totalCount: 0};
                        });
                }
            })
        });
    }

    mutationArray(array: any) {

        let data = {...this.dataUserExist.obj};
        delete data._id;

        data.USERS = array.map((res: any) => {

            const obj = res;
            const description = {
                DESCRIPTION: obj.DESCRIPTIONS,
                LANG:        obj.LANG ? obj.LANG : 'EU'
            };

            obj.DESCRIPTIONS = [];
            obj.DESCRIPTIONS.push(description);

            obj.key     && delete obj.key;
            obj.LANG    && delete obj.LANG;
            obj.__KEY__ && delete obj.__KEY__;

            return obj;

        });

        return data;
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

    update(event: any, row: any) {
        let data = {...row.key};
        data.TYPE = row.value;
        const array = [...this.dataUserExist.staticArray];
        array.splice(data.key , 1, data);

        const request_data = this.mutationArray(array);
        return this.isasSourceService.putUserExistValues(request_data)
        // .toPromise()
            .then(() => this.dataGrid.instance.refresh())
            .catch(error => {
                console.log(error);
            });
    }

    buttonAdd = (e: any) => !e.row.data.TYPE;

    sortingValue = (event: any) => event.value == null && this.dataGrid.instance.refresh();

    click_in_Icon(e: any, name: string) {
        name === 'edit'   && this.dataGrid.instance.editRow(e.rowIndex);
        name === 'delete' && this.dataGrid.instance.deleteRow(e.rowIndex);
        name === 'add'    && this.dataGrid.instance.addRow();
        if(name == 'info') {
            this.dataGrid.instance.editRow(e.rowIndex);
            let data:any = document.querySelector('.dx-datagrid-form-buttons-container > div[aria-label]');
            data.style.display = 'none'
        }
    }
}

