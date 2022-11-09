import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DxDataGridComponent} from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import {confirm} from 'devextreme/ui/dialog';

import {InfoPopupComponent} from '../../../../../shared/components/info-popup/info-popup.component';
import {DataGridUtil} from '../../../../../shared/helpers/data-grid-util';
import {MessageToast} from '../../../../../shared/helpers/message-toast';
import {FormatTypeList} from '../../../../../shared/models/format-type-list';
import {ISAS} from '../../../../../shared/models/isas';
import {ListObject} from '../../../../../shared/models/list-object';
import {OperatorList} from '../../../../../shared/models/operator-list';
import {AgentResolutionRuleService} from "../../services/agent-resolution-rule.service";

import {BehaviorSubject} from "rxjs";

@Component({
    selector: 'agent-resolution-home',
    templateUrl: './agent-resolution-home.component.html',
    styleUrls: ['./agent-resolution-home.component.scss']
})

export class AgentResolutionHomeComponent implements OnInit, OnDestroy {
    @ViewChild(InfoPopupComponent) infoPopup?: InfoPopupComponent;
    @ViewChild('conditionGrid') conditionGrid?: DxDataGridComponent;
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    customizeColumns = DataGridUtil.customizeColumns;
    dataSource: any;
    popupVisible = false;
    currentEmployee:any;
    defLength:any = [];
    private _defLength2:any = '';
    change:any = new BehaviorSubject('');

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private conditionService: AgentResolutionRuleService
    ) {
        this.defLength2 = navigator.language.split('-')[0].toUpperCase();

        this.dataSource = new DataSource({
            store: new CustomStore({
                load: (params) => this.conditionService.getAgentres()
                    .toPromise()
                    .then((agentRes:any) => {
                        const length = agentRes.length;
                        agentRes = agentRes.map((item:any) => {
                            item.ASSIGNEES = item.ASSIGNEES.join(',');

                            let obj:any = {
                                LANG: [],
                                TEXT: []
                            };
                            let array_count:any = [];
                            item.status = item.DESCRIPTION_TRANSLATE && item.DESCRIPTION_TRANSLATE.length > 0;
                            item.DESCRIPTION_TRANSLATE = item.DESCRIPTION_TRANSLATE ? item.DESCRIPTION_TRANSLATE
                                .map((LANG:any) => {
                                    LANG.TEXT = LANG.VALUES.LABEL;
                                    return LANG;
                                }) : [];
                            item.DESCRIPTION_TRANSLATE && item.DESCRIPTION_TRANSLATE.forEach((item:any) => {
                                Object.keys(item).forEach(
                                    data => item[data] && obj[data] && obj[data].push(item[data])
                                )
                            });
                            item.DESCRIPTION_TRANSLATE = {};

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
                            item.DESCRIPTION_TRANSLATE ? item.DESCRIPTION_TRANSLATE.LANG = obj.LANG.join(',') : null;
                            item.DESCRIPTION_TRANSLATE ? item.DESCRIPTION_TRANSLATE.TEXT = obj.TEXT.join(','): null;
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

                        action.forEach(item => this.builderFilter(item.varieble,agentRes,item.name));
                        return {
                            data: agentRes.splice(
                                params && params.skip ? params.skip : 0,
                                params && params.take ? params.take : length
                            ),
                            totalCount: length
                        };
                    })
                    .catch(error =>{
                        return {data: [], totalCount: 0};
                    })
            })
        });
        // this.change.subscribe(() => this.dataSource && this.dataSource._store && this.dataSource._store._loadFunc({}));
    }

    get defLength2() {
        return this._defLength2
    }

    set defLength2(data:any) {
        this._defLength2 = data;
        // this.change.next(data);
    }


    ngOnInit() {}
    ngOnDestroy() {
        this.change.unsubscribe()
    }

    builderFilter(varieble:string, data:any, nameMethod:string){
        const self:any = this;
        self[varieble] = [];
        let array:any = [];
        data.forEach((item:any) => array = [...array,...item.DESCRIPTION_TRANSLATE[nameMethod].split(',')]);
        self[varieble] = [...new Set(array)]
            .map((item:any) => {
                return {
                    text:item.toUpperCase(),
                    value:[`DESCRIPTION.${nameMethod}`,  "contains", item.toUpperCase()]
                }
            });
    }

    reloadConditions() {
        if (this.conditionGrid && this.conditionGrid.instance) {
            this.conditionGrid.instance.collapseAll(-1);
            setTimeout(() => this.dataSource.reload(), 150);
        }
    }

    sortingValue = (event: any) => {
        event.fullName == "columns[5].filterValue" && this.dataGrid.instance.refresh();
        event.value == null && this.dataGrid.instance.refresh();
    }

    addCondition = () => this.router.navigate(['add'], {relativeTo: this.route});

    editCondition(entityId: any, event: any) {
        event.stopImmediatePropagation();
        this.router.navigate([`edit/${entityId.RULE_ID}`], {relativeTo: this.route});
    }

    removeCondition(data: any, event: any) {
        event.stopImmediatePropagation();
        confirm('Delete this condition?', '').then(res => {
            if (res) {
                this.conditionService.deleteAgentres(data.RULE_ID)
                .subscribe(
                    () => {
                        MessageToast.showSuccess('Successfully deleted agent resolution rule');
                        this.dataSource.reload();
                    },
                    () => MessageToast.showError('Delete agent error'));
            }
        });
    }

    showInfo(data: any, event: any) {
        this.currentEmployee = data;
        this.popupVisible = true;
    }

    getButtonBackground(condition: any): string {
        let data;
        try {
            data = condition.data.QUERY.find((item: any) => item.condition === condition.data.CONDITION);
        } catch (e) {
            return 'bg-warning';
        }
        return data ? 'bg-success' : 'bg-warning';
    }

    getDisplayName(technicalName: any): string {
        if (!technicalName || !technicalName.value) return 'n/a';

        const formatType = FormatTypeList.list.find(type => type.technicalName === technicalName.value);

        if (formatType) return formatType.displayName;

        return 'n/a';
    }

    onConditionsGridToolbarPreparing(e: any) {
        e.toolbarOptions.items.unshift(
            {
                location: 'after',
                widget: 'dxButton',
                options: {
                    hint: 'Refresh',
                    icon: 'refresh',
                    onClick: this.reloadConditions.bind(this)
                }
            },
            {
                location: 'after',
                widget: 'dxButton',
                options: {
                    hint: 'Add new Condition',
                    icon: 'add',
                    onClick: this.addCondition.bind(this)
                }
            },
            {
                widget: "dxButton",
                options: {
                    hint: 'Export all data',
                    icon: "exportxlsx", onClick: () => this.dataGrid.instance.exportToExcel(false)
                },
                location: "after"
            });
    }

    bracesAsString = (bracesCount: number, start: boolean) => start?'['.repeat(bracesCount) : ']'.repeat(bracesCount);

    getTableDisplayName(technicalName: any): string {
        return ListObject.getDisplayName(technicalName.value, ISAS.tables);
    }

    getFieldDisplayName(technicalName: any): string {
        return ListObject.getDisplayName(
            technicalName.value,
            ([] as ListObject[])
                .concat(...ISAS.tables.map(table => table.isasFields)));
    }

    // tslint:disable-next-line:no-any
    getOperatorDisplayName = (technicalName: any): string =>
         ListObject.getDisplayName(technicalName.value, OperatorList.list);

    getOperationDisplayName = (technicalName: any): string =>
        ListObject.getDisplayName(technicalName.value, OperatorList.operation);

    getFormatTypeDisplayName(technicalName: any): string {
        return ListObject.getDisplayName(technicalName.value, FormatTypeList.list);
    }

    onExporting(e: any) {
        e.component.beginUpdate();
        e.component.columnOption('entityId', 'visible', false);
    }


    onExported(e: any) {
        e.component.columnOption('entityId', 'visible', true);
        e.component.endUpdate();
    }
}
