import {Component, OnInit, ViewChild} from '@angular/core';
import {DxDataGridComponent} from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import {confirm} from 'devextreme/ui/dialog';

import {InfoPopupComponent} from '../../../shared/components/info-popup/info-popup.component';
import {ReplacementData, ReplacementDataType} from '../../models/replacement-data';
import {AccountingSystemService} from '../../services/accounting-system.service';
import {ReplacementDataService} from '../../services/replacement-data.service';
import {MessageToast} from "../../../shared/helpers/message-toast";

@Component({
    selector: 'app-replacement-data-home',
    templateUrl: './replacement-data-home.component.html',
    styleUrls: ['./replacement-data-home.component.scss']
})
export class ReplacementDataHomeComponent implements OnInit {
    title = 'Replacement';
    // tslint:disable-next-line:no-any
    dataSource: DataSource;
    types: ReplacementDataType[] =
        [ReplacementDataType.SIMPLE, ReplacementDataType.CROSS_CHECKING];
    accountingSystems: string[] = ['All accounting systems'];
    @ViewChild(DxDataGridComponent) dataGrid?: DxDataGridComponent;
    @ViewChild(InfoPopupComponent) infoPopup?: InfoPopupComponent;

    constructor(
        private replacementDataService: ReplacementDataService,
        private accountingSystemServive: AccountingSystemService) {
        this.dataSource = new DataSource({
            store: new CustomStore({
                loadMode: 'processed',

                load: () => this.replacementDataService.getReplacementDataForTenant()
                    .toPromise()
                    .then(replacementData => {
                        if (replacementData) {
                            replacementData.forEach(
                                data => data =
                                    this.translateReplacementType(data));
                        }
                        return replacementData;
                    }),

                insert: (replacementData) => {
                    return this.replacementDataService
                        .insertReplacementData(replacementData)
                        .toPromise()
                        .then(newReplacementData => JSON.parse(JSON.stringify(newReplacementData)));
                },

                update: (replacementData, newData) => {
                    Object.assign(replacementData, newData);
                    return this.replacementDataService
                        .updateReplacementData(replacementData)
                        .toPromise()
                        .then(updatedReplacementData => JSON.parse(JSON.stringify(updatedReplacementData)));
                },

                remove: replacementData =>
                    this.replacementDataService.deleteReplacementData(replacementData)
                        .subscribe()
            })
        });
    }

    ngOnInit() {
        this.accountingSystemServive.getAccountingSystemsForTenant().subscribe(
            accSystems => accSystems.forEach(
                accSys => this.accountingSystems =
                    this.accountingSystems.concat([accSys.name])));
    }

    // tslint:disable-next-line:no-any
    setReplacementType(rowData: any, value: any) {
        rowData.numberOfPlaces = null;
        rowData.searchFeature = null;
        // tslint:disable-next-line:no-any
        (this as any).defaultSetCellValue(rowData, value);
    }

    // tslint:disable-next-line:no-any
    onCellPrepared(event: any) {
        if (event.rowType === 'data' && event.column.command === 'edit') {
            // console.log(event.row);
            const isEditing = event.row.isEditing, cellElement = event.cellElement;

            if (isEditing) {
                const saveLink = cellElement.querySelector('.dx-link-save'),
                    cancelLink = cellElement.querySelector('.dx-link-cancel');

                saveLink.classList.add('dx-icon-save');
                cancelLink.classList.add('dx-icon-revert');

                saveLink.textContent = '';
                cancelLink.textContent = '';
            } else {
                const editLink = cellElement.querySelector('.dx-link-edit'),
                    deleteLink = cellElement.querySelector('.dx-link-delete');

                editLink.classList.add('dx-icon-edit');
                deleteLink.classList.add('dx-icon-trash');

                editLink.textContent = '';
                deleteLink.textContent = '';
            }
        }
    }

    onSelectionChanged() {
        if (this.dataGrid) {
            this.toggleMultipleDeleteButton(true);
            const selectedRowsNum =
                this.dataGrid.instance.getSelectedRowKeys().length;
            if (selectedRowsNum > 0) {
                this.toggleMultipleDeleteButton(false);
            }
        }
    }

    // tslint:disable-next-line:no-any
    rowValidating(event: any) {
        console.log('rowValidating');
        let duplicate: ReplacementData[];

        if (event && event.brokenRules && event.brokenRules.length > 0) {
            MessageToast.showError(event.brokenRules[0].message);
        }

        duplicate = this.dataSource.items().filter(
            (item: ReplacementData) => item.replacementType ===
                (event.newData.replacementType || event.key.replacementType) &&
                item.accountingSystem ===
                (event.newData.accountingSystem ||
                    event.key.accountingSystem) &&
                item.key === (event.newData.key || event.key.key) &&
                item.evaluationGroup ===
                (event.newData.evaluationGroup || event.key.evaluationGroup) &&
                item.result === (event.newData.result || event.key.result) &&
                (item.numberOfPlaces === event.newData.numberOfPlaces || item.numberOfPlaces === event.key.numberOfPlaces));

        if (duplicate && duplicate.length > 0 && !event.key.id ||
            duplicate.filter((item: ReplacementData) => item.id !== event.key.id)
                .length > 0) {
            MessageToast.showError('Entry already exist');
            event.isValid = false;
        }

        const numberOfPlaces = (event.newData.numberOfPlaces === undefined ? event.key.numberOfPlaces : event.newData.numberOfPlaces);
        if (numberOfPlaces != null && (numberOfPlaces < 0 || numberOfPlaces > (event.newData.evaluationGroup || event.key.evaluationGroup).length)) {
            MessageToast.showError('Invalid number of places');
            event.isValid = false;
        }
    }

    // tslint:disable-next-line:no-any
    onToolbarPreparing(e: any) {
        e.toolbarOptions.items.unshift({
            location: 'after',
            widget: 'dxButton',
            options: {
                hint: 'Refresh',
                icon: 'refresh',
                onClick: this.reloadReplacementData.bind(this)
            }
        });
        const firstPartToolbar = e.toolbarOptions.items.slice(0, 3);
        const lastPartToolbar =
            e.toolbarOptions.items.slice(3, e.toolbarOptions.items.length);
        lastPartToolbar.unshift({
            location: 'after',
            widget: 'dxButton',
            options: {
                hint: 'Delete selected',
                icon: 'trash',
                onClick: this.deleteMultiple.bind(this),
                elementAttr: {id: 'multipleDeleteButton'},
                disabled: true
            }
        });
        e.toolbarOptions.items = firstPartToolbar.concat(lastPartToolbar);
    }

    private deleteMultiple() {
        if (this.dataGrid && this.dataGrid.instance &&
            this.dataGrid.editing.texts) {
            let deleteMessage = this.dataGrid.editing.texts.confirmDeleteMessage;
            this.dataGrid.editing.texts.confirmDeleteMessage = '';
            const grid = this.dataGrid.instance;
            const selectedRowKeys = grid.getSelectedRowKeys();
            if (selectedRowKeys.length > 1) {
                deleteMessage = 'Are you sure you want to delete these records?';
            }
            if (deleteMessage) {
                confirm(deleteMessage, '').then(res => {
                    if (res) {
                        selectedRowKeys.forEach((row) => {
                            const index = grid.getRowIndexByKey(row);
                            grid.deleteRow(index);
                            grid.refresh();
                        });
                        this.toggleMultipleDeleteButton(true);
                    }
                    if (this.dataGrid && this.dataGrid.editing.texts) {
                        this.dataGrid.editing.texts.confirmDeleteMessage = 'Are you sure you want to delete this record?';
                    }
                });
            }
        }
    }

    private toggleMultipleDeleteButton(disabled: boolean) {
        const multipleDeleteButton =
            document.getElementById('multipleDeleteButton');
        if (multipleDeleteButton) {
            if (disabled) {
                multipleDeleteButton.classList.add('dx-state-disabled');
            } else {
                multipleDeleteButton.classList.remove('dx-state-disabled');
            }
        }
    }

    // tslint:disable-next-line:no-any
    showInfo(id: number, event: any) {
        event.stopImmediatePropagation();
        if (this.infoPopup) {
            this.infoPopup.showInfoForObject(this.dataSource.items().find(
                replacementData => replacementData.id === id));
        }
    }

    private reloadReplacementData() {
        this.dataSource.reload();
        if (this.dataGrid && this.dataGrid.instance) {
            const grid = this.dataGrid.instance;
            grid.refresh();
            grid.deselectAll();
        }
    }

    // tslint:disable-next-line:no-any
    onExporting(e: any) {
        e.component.beginUpdate();
        e.component.columnOption('id', 'visible', false);
    }

    // tslint:disable-next-line:no-any
    onEditorPreparing(event: any) {
        if (event.row && event.row.data) {
            if (event.parentType === "dataRow" && event.dataField === "numberOfPlaces") {
                event.editorOptions.disabled = (event.row.data.replacementType === ReplacementDataType.SIMPLE);
            }
        }
    }

    // tslint:disable-next-line:no-any
    onExported(e: any) {
        e.component.columnOption('id', 'visible', true);
        e.component.endUpdate();
    }

    private translateReplacementType(data: ReplacementData): ReplacementData {
        if (data.replacementType === 'SIMPLE') {
            data.replacementType = ReplacementDataType.SIMPLE;
            data.numberOfPlaces = null;
        } else {
            data.replacementType = ReplacementDataType.CROSS_CHECKING;
        }
        return data;
    }
}
