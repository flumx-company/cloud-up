import {Location} from '@angular/common';
import {
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewChildren
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {DxFormComponent} from 'devextreme-angular/ui/form';
import {DxDataGridComponent} from 'devextreme-angular/ui/data-grid';
import {confirm} from 'devextreme/ui/dialog';

import {InfoPopupComponent} from '../../../../../shared/components/info-popup/info-popup.component';
import {DataGridUtil} from '../../../../../shared/helpers/data-grid-util';
import {MessageToast} from '../../../../../shared/helpers/message-toast';
import {FormatTypeList} from '../../../../../shared/models/format-type-list';
import {ISAS} from '../../../../../shared/models/isas';
import {OperatorList} from '../../../../../shared/models/operator-list';
import {ConditionService} from '../../_service/condition.service';
import {FieldConfigService} from '../../_service/field-config.service';

import {map} from "rxjs/operators";
import "rxjs/add/operator/max";
import {switchMap} from 'rxjs/operators';
import {combineLatest} from "rxjs/observable/combineLatest";

import {CONDITION, CONDITION_PART} from "../../interface/condition_interface";

import {Query} from "../../../../../../helpers/query";
import {Subject} from "rxjs";

@Component({
    selector: 'app-condition-detail',
    templateUrl: './condition-detail.component.html',
    styleUrls: ['./condition-detail.component.css']
})

export class ConditionDetailComponent implements OnInit, OnDestroy {

    @ViewChild(InfoPopupComponent) infoPopup?: InfoPopupComponent;
    @ViewChild('assignCondition') assignConditionGrid?: DxDataGridComponent;
    @ViewChildren('matchFieldSelectBox') dd: any;
    @ViewChild(DxFormComponent) form: DxFormComponent;

    customizeColumns = DataGridUtil.customizeColumns;
    currentCondition: any = new CONDITION();
    viewMode?: string;
    viewName?: string;
    name?: string;
    list: any = ISAS.tables;
    operations = OperatorList.operation;
    formattype = FormatTypeList.list;
    operators = OperatorList.list;
    error = false;
    error_Text = '';
    matchFieldList: any = [];
    HEADER: any = [];
    ITEMS: any = [];
    private componentDestroyed: Subject<any> = new Subject();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private conditionService: ConditionService,
        private fieldConfigService: FieldConfigService,
        private location: Location
    ) {}

    saveCondition() {
        let data = JSON.parse(JSON.stringify(this.currentCondition));
        const action = ['MATCH_ENTITY', 'MATCH_FIELD', 'OPERATOR', 'VALUE', 'OPERATION'];

        data.CONDITION_PARTS.forEach((item: any) => {
            item.error = {};
            action.forEach(act => !item[act] && (item.error[act] = true) );
            return item;
        });

        const parts = data.CONDITION_PARTS.length;
        parts >= 1 && data.CONDITION_PARTS[parts - 1] && data.CONDITION_PARTS[parts - 1].error &&
        data.CONDITION_PARTS[parts - 1].error.OPERATION && delete data.CONDITION_PARTS[parts - 1].error.OPERATION;

        let get_error = data.CONDITION_PARTS.some((item: any) => action.some(act => item.error[act]));

        if (get_error) {
            this.currentCondition = data;
            return;
        }

        data.CONDITION_PARTS = data.CONDITION_PARTS.map((item: any) => {
            item.error && delete item.error;
            item.ITEMS && delete item.ITEMS;
            item.index && delete item.index;
            return item;
        });

        data.QUERY = new Query(data.CONDITION_PARTS, this.operators, this.operations);
        data.QUERY = data.QUERY.convertToString();

        this.error_Text = '';
        if (this.viewMode === 'add') {
            this.conditionService.createCondition(data)
                .subscribe(
                    () => this.router.navigateByUrl('/configuration/general-technical/conditions'),
                    () => MessageToast.showError(`${'You don`t create Condition'}`, 10000)
                )
        } else {
            data._id && delete data._id;
            data.CONDITION = Number(data.CONDITION);
            this.conditionService.updateCondition(data, data.CONDITION)
                .subscribe(
                    () => this.router.navigateByUrl('/configuration/general-technical/conditions'),
                    () => MessageToast.showError(`${'You don`t modify Condition'}`, 10000)
                )
        }
    }


    ngOnInit() {

        const routerParams$ = this.route.params;
        const fieldConfigs$ = this.fieldConfigService.getFieldConfig();

        routerParams$.pipe(
            switchMap((params: any) => {

                this.viewMode = params['mode'];
                this.viewName = params['name'];

                const conditions$ = this.viewMode === 'add'
                    ?
                    this.conditionService.getConditions()
                        .pipe(map((res: any) => res.map((item: any) => item.CONDITION)))
                    :
                    this.conditionService.getCondition(Number(this.viewName));

                return combineLatest(fieldConfigs$, conditions$);

            })
        )
        .takeUntil(this.componentDestroyed)
        .subscribe(
            ([fieldConfigs, conditions]) => {
                this.setFieldsConfig(fieldConfigs);

                let res: any = conditions;

                this.currentCondition = Array.isArray(res) ? new CONDITION({
                    CONDITION: this.getAvailableCondition(res)
                }) : res;

                this.currentCondition.CONDITION_PARTS.map((item: any, index: any) => {
                    item.index = index;
                    item.ITEMS = [];
                    item.MATCH_ENTITY == 'HEADER' ? item.ITEMS = this.HEADER : null;
                    item.MATCH_ENTITY == 'ITEMS' ? item.ITEMS = this.ITEMS : null;

                    item.CONDITION = this.currentCondition.CONDITION.toString();
                    return item;
                })

            },
            (...error: Array<any>) => {
                console.log(error)
            },
            (): any => {
                console.log('gg wp')
            });
    }


    getAvailableCondition(res: any): number {
        const MAX = Math.max(...res);
        res.push(0);
        let New_array = Array
            .from(Array(MAX).keys())
            .filter(item => res.indexOf(item) == -1);
        return Number(New_array.length == 0 ? MAX + 1 : Math.min(...New_array));
    }

    setFieldsConfig(fields: any) {
        const self: any = this;
        ['HEADER', 'ITEMS'].forEach(item => self[item] = fields[item]
            .map((item: any) => {
                return {
                    LABEL: item && item.LABELS && item.LABELS.LABEL ? item.LABELS.LABEL : null,
                    KEY: item && item.KEY ? item.KEY : null
                }
            })
            .filter((item: any) => item.LABEL && item.KEY)
        )
    }

    navBack = () => confirm('Continue without saving?', '').then(res => res && this.location.back());


    getCssClass = (data: any, name: string) => {
        if (name == 'VALUE') return data && data.key && data.key.error && data.key.error[name] ? 'errorCell' : '';

        if (data && data.key && data.key.error) {
            let conditionPart;
            try {
                conditionPart = this.getOneCondition(data.rowIndex);
            } catch (e) {
                return '';
            }
            if (!conditionPart.error[name]) return '';
            conditionPart.error[name] = !data.key[name]
        }
        return data && data.key && data.key.error && data.key.error[name] ? 'errorCell' : '';
    };

    addConditionPart() {
        this.currentCondition.CONDITION_PARTS
            .push(new CONDITION_PART({index: this.currentCondition.CONDITION_PARTS.length}));
    }

    addBraces(index: number, start: boolean) {
        const conditionPart = this.getOneCondition(index);

        if (conditionPart) {
            !conditionPart.STARTING_BRACES ? conditionPart.STARTING_BRACES = 0 : null;

            !conditionPart.ENDING_BRACES ? conditionPart.ENDING_BRACES = 0 : null;

            start ? conditionPart.STARTING_BRACES++ : conditionPart.ENDING_BRACES++;
        }
    }

    getOneCondition = (index: any) => this.currentCondition.CONDITION_PARTS
        .find((part: any) => part.index === index);

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

    getValue(index: any = null, valueType: string) {
        let conditionPart: any;

        try {
            conditionPart = this.getOneCondition(index);
        } catch (e) {
            return '';
        }

        if (!conditionPart) return '';

        return conditionPart[valueType];
    }

    changeValue(data: any, event: any, valueType: string, sell: any) {

        const index = sell ? sell.rowIndex : data;

        let conditionPart: any;

        try {
            conditionPart = this.getOneCondition(index);
        } catch (e) {
            return '';
        }

        if (!conditionPart) return;

        conditionPart[valueType] = valueType == 'VALUE' ? Number(event.value) : event.value;
        if (valueType === 'MATCH_ENTITY') {
            conditionPart.ITEMS = event.value === 'HEADER' ? this.HEADER : this.ITEMS;
        }
        return;
    }

    onContentReady = (e: any) => e.component.option('loadPanel.enabled', false);

    onFileSaving = (e: any, prefix: string) => e.fileName = `${prefix}_${this.currentCondition.entityId.name}`;

    onToolbarPreparing(e: any) {
        e.toolbarOptions.items.unshift(
            {
                location: 'after',
                widget: 'dxButton',
                options: {
                    hint: 'Add new Part',
                    icon: 'add',
                    onClick: this.addConditionPart.bind(this)
                }
            },
            {
                location: 'after',
                widget: 'dxButton',
                options: {
                    hint: 'Remove last Part',
                    icon: 'revert',
                    onClick: () => this.currentCondition.CONDITION_PARTS = []
                }
            })
    }

    deleteItem = (index:any) => this.currentCondition.CONDITION_PARTS.splice(index, 1);

    isDisabled = (data: any) => data.rowIndex === this.currentCondition.CONDITION_PARTS.length - 1;

    bracesAsString = (bracesCount: number, start: boolean) => start ? '['.repeat(bracesCount) : ']'.repeat(bracesCount);

    dropDownOpened = (event: any) => setTimeout(() => event.component._popup.option('width', 260));

    dropDownContentReady = (event: any) => setTimeout(() => event.component._popup.option('width', 260));

    ngOnDestroy(): void {
        this.componentDestroyed.next();
        this.componentDestroyed.complete();
    }
}
