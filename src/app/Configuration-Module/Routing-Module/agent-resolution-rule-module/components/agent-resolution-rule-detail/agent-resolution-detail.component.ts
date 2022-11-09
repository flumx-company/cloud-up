import {Component, OnDestroy, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';

import {DxDataGridComponent} from 'devextreme-angular/ui/data-grid';
import {DxFormComponent} from 'devextreme-angular/ui/form';
import {DxTreeViewComponent} from 'devextreme-angular/ui/tree-view';
import {confirm} from 'devextreme/ui/dialog';

import {InfoPopupComponent} from '../../../../../shared/components/info-popup/info-popup.component';
import {DataGridUtil} from '../../../../../shared/helpers/data-grid-util';
import {MessageToast} from '../../../../../shared/helpers/message-toast';
import {FormatTypeList} from '../../../../../shared/models/format-type-list';
import {ISAS} from '../../../../../shared/models/isas';
import {OperatorList} from '../../../../../shared/models/operator-list';
import {Query} from "../../../../../../helpers/query";

import {AGENT_TYPE} from "../../interfaces/agent-type-interface";

import {AgentResolutionRuleService} from '../../services/agent-resolution-rule.service';
import {FieldConfigService} from '../../services/field-config.service';
import {ConditionService} from "../../../../Technical-Configuration-Module/Conditions-module/_service/condition.service";
import {RecordTypeService} from "../../../../Field-Configuration-Module/record-type-module/_service/record.type.service";

import {Subject} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {combineLatest} from "rxjs/observable/combineLatest";
import "rxjs/add/operator/max";
import 'rxjs/add/operator/takeUntil';

@Component({
    selector: 'app-condition-detail',
    templateUrl: './agent-resolution-detail.component.html',
    styleUrls: ['./agent-resolution-detail.component.css']
})
export class AgentResolutionDetailComponent implements OnInit, OnDestroy {
    @ViewChild(InfoPopupComponent) infoPopup?: InfoPopupComponent;
    @ViewChild('assignCondition') assignConditionGrid?: DxDataGridComponent;
    @ViewChildren('matchFieldSelectBox') dd: any;
    @ViewChild(DxTreeViewComponent) treeView:any;
    @ViewChild(DxFormComponent) form: DxFormComponent;
    private componentDestroyed: Subject<any> = new Subject();
    customizeColumns = DataGridUtil.customizeColumns;
    currentCondition: any = new AGENT_TYPE();
    viewMode?: string;
    viewName?: any;
    name?: string;
    list: any = ISAS.tables;
    operations = OperatorList.operation;
    formattype = FormatTypeList.list;
    operators = OperatorList.list;
    conditions: any= [];
    error = false;
    matchFieldList:any = [];
    HEADER:any = [];
    ITEMS:any = [];
    condCell:any = [];
    treeDataSource: any;
    treeBoxValue:any = [];
    record:any = [];
    recType:any = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private agentResService: AgentResolutionRuleService,
        private conditionService: ConditionService,
        private fieldConfigService: FieldConfigService,
        private recordTypeService: RecordTypeService,
        private location: Location
    ) {}

    saveCondition() {
        let data = JSON.parse(JSON.stringify(this.currentCondition));
        const action = ['MATCH_ENTITY', 'MATCH_FIELD', 'OPERATOR', 'VALUE', 'OPERATION'];

        if(data.AGENT_PARTS.length == 0){
            return MessageToast.showError(`${'AGENT PARTS cannot be empty'}`, 10000);
        }
        if(!data.TYPE)            return MessageToast.showError(`${'Type cannot be empty'}`, 10000);
        if(!data.REC_TYPE)        return MessageToast.showError(`${'REC TYPE cannot be empty'}`, 10000);
        if(data.DESCRIPTION_TRANSLATE.length == 0) {
            return MessageToast.showError(`${'DESCRIPTION TRANSLATE cannot be empty'}`, 10000);
        }
        data.ASSIGNEES = this.treeBoxValue;

        data.AGENT_PARTS.forEach((item:any) => {
            item.error = {};
            action.forEach(act => !item[act] ? item.error[act] = true : null);
            return item;
        });

        const parts = data.AGENT_PARTS.length;

        parts >= 1 && data.AGENT_PARTS[parts - 1] && data.AGENT_PARTS[parts - 1].error &&
        data.AGENT_PARTS[parts - 1].error.OPERATION && delete data.AGENT_PARTS[parts - 1].error.OPERATION;

        let get_error = data.AGENT_PARTS.some((item:any) => action.some(act => item.error[act]));
        let get_error_description = data.DESCRIPTION_TRANSLATE
            .some((item:any) => !item.LANG || !item.TEXT ||
                this.valueIsNumeric(item.LANG) || this.valueIsNumeric(item.TEXT));

        if(get_error || get_error_description) {
            this.currentCondition = data;
            return MessageToast.showError(`fill in or enter the correct values ${get_error ? 
                'in Agent Parts' : 'in Description Translate'}`, 10000);
        }
        data.DESCRIPTION_TRANSLATE = data.DESCRIPTION_TRANSLATE.map((LANG:any) => {
            LANG.VALUES = {LABEL:LANG.TEXT.toUpperCase()};
            LANG.LANG = LANG.LANG.toUpperCase();
            LANG.TEXT && delete LANG.TEXT;
            return LANG;
        });

        data.AGENT_PARTS = data.AGENT_PARTS.map((item:any) => {
            item.error && delete item.error;
            item.ITEMS && delete item.ITEMS;
            item.index && delete item.index;
            item.VALUE = Number(item.VALUE);
            return item;
        });
        data.SCOPE = new Query(data.AGENT_PARTS, this.operators, this.operations);
        data.SCOPE = data.SCOPE.convertToString();

        if (this.viewMode === 'add') {
            this.agentResService.createAgentres(data)
                .subscribe(
                    () => this.location.back(),
                    (error: any) => {
                        MessageToast.showError(`${error.message ? error.message : 'Failed to create the record'}`,
                            10000);
                    }
                )
        } else {
            data._id && delete data._id;
            this.agentResService.updateAgentres(data, data.RULE_ID)
                .subscribe(
                    () => this.location.back(),
                    (error: any) =>
                        MessageToast.showError(`${error.message ? error.message : 'Failed to modify the record'}`,
                        10000)
                )
        }
    }

    valueIsNumeric = (value:any) => !isNaN(parseFloat(value)) && isFinite(value); // /^-{0,1}\d+$/.test(value);

    isDisabled = (data:any) => data.rowIndex === this.currentCondition.AGENT_PARTS.length - 1;

    ngOnDestroy(): void {
        this.componentDestroyed.next();
        this.componentDestroyed.complete();
    }

    ngOnInit() {

        const routerParams$ = this.route.params;
        const fieldConfigs$ = this.fieldConfigService.getFieldConfig();
        const conditions$ = this.conditionService.getConditions()
            .pipe(
                map((res: any) => {
                    return res.map((item: any) => item.CONDITION);
                })
            );
        const getAssigness$ = this.agentResService.getAssigness();
        const agents$:any = this.agentResService.getAgentres();
        const records$:any = this.recordTypeService.getRecordDocument();
        const agentType$:any = this.recordTypeService.agentType();

        routerParams$.pipe(
            switchMap((params: any) => {

                this.viewMode = params['mode'];
                this.viewName = params['index'];

                return combineLatest(fieldConfigs$, conditions$, agents$, getAssigness$, records$, agentType$);

            })

        )
        .takeUntil(this.componentDestroyed)
        .subscribe(
            ([fieldConfigs, conditions, agents$, getAssigness$, records$, agentType$]) => {
                this.record = [];
                this.record = records$.TYPES.map((item:any) => item.TYPE);

                this.recType = agentType$;

                this.treeDataSource = getAssigness$.map((item:any) => ({name: item}));
                this.condCell = conditions;
                this.setFieldsConfig(fieldConfigs);

                let agent:any = agents$.find((item:any) => this.viewName == item.RULE_ID);

                this.currentCondition =  new AGENT_TYPE(agent);

                this.treeBoxValue = Array.isArray(this.currentCondition.ASSIGNEES)
                    ? this.currentCondition.ASSIGNEES
                    : this.currentCondition.ASSIGNEES.split(',');

                this.treeDataSource = this.treeDataSource.map((item: any) => {
                    this.treeBoxValue.join(',').indexOf(item.name) > -1 ? item.selected = true : item.selected = false;
                    return item;
                });

                this.currentCondition.AGENT_PARTS = this.currentCondition.AGENT_PARTS
                    .map((item:any, index:any) => {
                        item.index = index;

                        item.ITEMS = [];
                        item.MATCH_ENTITY == 'HEADER' ? item.ITEMS = this.HEADER : null;
                        item.MATCH_ENTITY == 'ITEMS' ? item.ITEMS = this.ITEMS : null;

                        item.CONDITION = this.currentCondition.COND_NUM.toString();
                        return item;
                    });
                this.currentCondition.DESCRIPTION_TRANSLATE = this.currentCondition.DESCRIPTION_TRANSLATE
                    .map((LANG:any) => {
                        LANG.TEXT = LANG.VALUES.LABEL;
                        return LANG;
                    })
            }, () => MessageToast.showError(`Failed get data`, 10000));
    }

    setFieldsConfig(fields: any) {
        const self:any = this;
        ['HEADER', 'ITEMS'].forEach(item => self[item] = fields[item]
            .map((item: any) => {
                return {
                    LABEL: item && item.LABELS && item.LABELS.LABEL ? item.LABELS.LABEL : null,
                    KEY:item && item.KEY ? item.KEY : null
                }
            })
            .filter((item:any) => item.LABEL && item.KEY)
        )
    }

    syncTreeViewSelection(e:any) {
        let component = (e && e.component) || (this.treeView && this.treeView.instance);
        if (!component) return;
        !this.treeBoxValue && component.unselectAll();
        this.treeBoxValue && this.treeBoxValue.forEach((value: any) => component.selectItem(value));
    }


    getSelectedItemsKeys(items:any) {
        let result:any = [];
        items.forEach((item:any) => {
            item.selected && result.push(item.text);
            item.items.length ? result = result.concat(this.getSelectedItemsKeys(item.items)) : null;
        });
        return result;
    }

    treeView_itemSelectionChanged(e:any){
        const nodes = e.component.getNodes();
        this.treeBoxValue = this.getSelectedItemsKeys(nodes);
    }

    getFormValue = (type?:string) =>  type == 'record' ?
        this.getCurrent('REC_TYPE') : this.getCurrent('COND_NUM');

    getCurrent = (name:string) => this.currentCondition && this.currentCondition[name] ? this.currentCondition[name] : '';

    changeFormValue = (event?:any, type?:string) => {
        if(type == 'record'){
            this.currentCondition.REC_TYPE = event && event.value ? event.value : this.currentCondition.REC_TYPE
        } else {
            this.currentCondition.COND_NUM = event && event.value ? event.value : this.currentCondition.COND_NUM
        }
    };

    navBack() {
        confirm('Continue without saving?', '')
            .then(res => res && this.location.back());
    }


    getCssClass = (data: any, name: string) =>  {
        if(data && data.key && data.key.error) {
            let conditionPart;
            try {
                conditionPart = this.getOneCondition(data.rowIndex);
            } catch (e) {
                return '';
            }
            if(!conditionPart.error[name]) return '';
            conditionPart.error[name] = !data.key[name]
        }
        return data && data.key && data.key.error && data.key.error[name] ? 'errorCell' : '';
    };


    addConditionPart() {
        this.currentCondition.AGENT_PARTS.push(
            new AGENT_TYPE({index: this.currentCondition.AGENT_PARTS.length})
        );
    }

    addConditionLang = () => this.currentCondition.DESCRIPTION_TRANSLATE.push({LANG: '', TEXT:''});

    addBraces(index: number, start: boolean) {
        const conditionPart = this.getOneCondition(index);

        if (conditionPart) {
            !conditionPart.STARTING_BRACES ? conditionPart.STARTING_BRACES = 0 : null;

            !conditionPart.ENDING_BRACES ? conditionPart.ENDING_BRACES = 0 : null;

            start ? conditionPart.STARTING_BRACES++ : conditionPart.ENDING_BRACES++;
        }
    }

    getOneCondition =(index:any)=> this.currentCondition.AGENT_PARTS.find((part: any) => part.index === index);

    removeBraces(index: number, start: boolean) {
        const conditionPart = this.getOneCondition(index);

        if (conditionPart) {
            !conditionPart.STARTING_BRACES ? conditionPart.STARTING_BRACES = 0 : null;

            !conditionPart.ENDING_BRACES ? conditionPart.ENDING_BRACES = 0 : null;

            start
                ?
            conditionPart.STARTING_BRACES > 0 && conditionPart.STARTING_BRACES--
                :
            conditionPart.ENDING_BRACES > 0 && conditionPart.ENDING_BRACES--
        }
    }

     getValue(index: any = null, valueType: string, array: any = null) {
        let conditionPart: any;

        try {
            conditionPart = this.getOneCondition(index);
        } catch (e) {
            return '';
        }

        if (!conditionPart) return '';

        return conditionPart[valueType];
    }

    changeValue(data: any, event: any, valueType: string, sell?: any) {

        const index = sell ? sell.rowIndex : data;

        let conditionPart: any;

        try {
            conditionPart = this.getOneCondition(index);
        } catch (e) {
            return '';
        }

        if (!conditionPart) return;

        conditionPart[valueType] = valueType == 'VALUE' ? Number(event.value) : event.value;

        if(valueType === 'MATCH_ENTITY'){
            conditionPart.ITEMS = event.value === 'HEADER' ? this.HEADER :  this.ITEMS
        }

        return;
    }
    onContentReady = (e: any) => e.component.option('loadPanel.enabled', false);

    onFileSaving = (e: any, prefix: string) => e.fileName = `${prefix}_${this.currentCondition.entityId.name}`;

    onToolbarPreparing(e: any, type:any) {
        e.toolbarOptions.items.unshift(
            {
                location: 'after',
                widget: 'dxButton',
                options: {
                    hint: 'Add new Part',
                    icon: 'add',
                    onClick: type === 'AGENT_PARTS' ? this.addConditionPart.bind(this) : this.addConditionLang.bind(this)
                }
            },
            {
                location: 'after',
                widget: 'dxButton',
                options: {
                    hint: 'Remove last Part',
                    icon: 'revert',
                    onClick: () => type === 'AGENT_PARTS' ?
                        this.currentCondition.AGENT_PARTS = [] :
                        this.currentCondition.DESCRIPTION_TRANSLATE = []
                }
            });
    }

    deleteItem(index:any){
        this.currentCondition.AGENT_PARTS.splice(index, 1)
    }

    bracesAsString = (bracesCount: number, start: boolean) => start?'['.repeat(bracesCount) : ']'.repeat(bracesCount);


    dropDownOpened = (event: any) => setTimeout(() => event.component._popup.option('width', 260));

    dropDownContentReady = (event: any) => setTimeout(() => event.component._popup.option('width', 260));

    getLangValue = (index:any, type:any) => {
        const item = this.getItemLang(index);
        return item && item[type];
    };

    changeLangValue = (index:any, data:any, type:any) => {
        const item = this.getItemLang(index);
        item && (item[type] = data.value);
    };
    deleteLangItem = (index:any) => {
        this.currentCondition.DESCRIPTION_TRANSLATE.splice(index, 1);
    };

    getCssLangClass = (index:any, type:any) => {
        const item = this.getItemLang(index);
        return item && !item[type] && 'errorCell'
    };

    getItemLang = (index:number) => this.currentCondition.DESCRIPTION_TRANSLATE[index];

}
