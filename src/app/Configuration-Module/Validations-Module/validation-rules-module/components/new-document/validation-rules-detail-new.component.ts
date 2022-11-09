import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {DxDataGridComponent} from 'devextreme-angular/ui/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import {confirm} from "devextreme/ui/dialog";

import {InfoPopupComponent} from '../../../../../shared/components/info-popup/info-popup.component';

import {DataGridUtil} from "../../../../../shared/helpers/data-grid-util";
import {MessageToast} from "../../../../../shared/helpers/message-toast";

import {switchMap} from "rxjs/operators";

import {RecordTypeService} from "../../../../Field-Configuration-Module/record-type-module/_service/record.type.service";
import {ValidationRulesService} from "../../services/validation-rules.service";
import {DetailScreenFieldConfigService} from "../../../../Field-Configuration-Module/detail-screen-field-config-module/_service/detail-screen-field-config.service";

import {RulesList} from "../../../../../shared/models/rules-list";
import {RouterInterface} from "../../../../../_interface_common/router_interface";
import {VALIDATION} from "../../interfaces/validation.interface";

@Component({
    selector: 'validations-detail',
    templateUrl: './validation-rules-detail-new.component.html',
    styleUrls: ['./validation-rules-detail-new.component.scss']
})

export class ValidationRulesDetailNewComponent implements OnInit {
    @ViewChild(InfoPopupComponent) infoPopup?: InfoPopupComponent;
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    customizeColumns = DataGridUtil.customizeColumns;
    viewMode: any;
    viewName: any;
    record: any = [];
    currentValidation: any = new VALIDATION();
    value: any = [];
    one = true;
    data: any = {
        ABORT_POST: false,
        CHECK_TYPE: false,
        GOON: false
    };
    buttonOptions: any = {
        text: "Save",
        useSubmitBehavior: true
    };
    rulesList = RulesList.list;

    constructor(
        private ValidationService: ValidationRulesService,
        private router: Router,
        private route: ActivatedRoute,
        private recordTypeService: RecordTypeService,
        private detailScreenFieldConfigService: DetailScreenFieldConfigService
    ) {}

    ngOnInit() {
        this.recordTypeService.getRecordDocument()//this.recordTypeService.getRecordDocument();
            .subscribe((record: any) => {
                this.record = record.TYPES.map(({ TYPE }: any) => TYPE);
                this.value = new DataSource({
                    store: new CustomStore({
                        load: () => {
                            return this.getData()
                                .then((data: any) => {
                                    data = data[0];
                                    data ? this.currentValidation = data : null;
                                    let { RULES } = this.currentValidation;
                                    const arrIndex = this.getIndexes(this.currentValidation.RULES);
                                    RULES = RULES ?  RULES
                                        .map((item: any) => {
                                            item.id = this.detailScreenFieldConfigService
                                                .uuid(this.detailScreenFieldConfigService.makeWordRandom(20));
                                            item.indexes = arrIndex;
                                            return item;
                                        }) : [];
                                    this.one = false;
                                    return {
                                        data:       RULES ? RULES : [],
                                        totalCount: RULES ? RULES.length : 0
                                    };
                                })
                                .catch(({ error }: any) => {
                                    MessageToast.showError(error && error.MESSAGE ? error.MESSAGE : 'Error');
                                    return {data: [], totalCount: 0};
                                });
                        },
                        insert: (values: any) => {
                            let { ABORT_POST , CHECK_TYPE, GOON} = this.data;
                            const array = this.currentValidation.RULES;
                            values.ABORT_POST = ABORT_POST;
                            values.CHECK_TYPE = CHECK_TYPE;
                            values.GOON       = GOON;
                            array.unshift(values);
                            this.currentValidation.RULES = array;
                            this.currentValidation._id && delete this.currentValidation._id;
                            return this.ValidationService.test(this.currentValidation.RULES)
                                .then(() => {
                                    ABORT_POST = false;
                                    CHECK_TYPE = false;
                                    GOON = false;
                                    MessageToast.showSuccess('Successfully add rule');
                                    this.dataGrid.instance.refresh();
                                })
                                .catch(() => MessageToast.showError('Error add rule'));
                        },
                        update: (obj: any, values: any) => {
                            let { ABORT_POST , CHECK_TYPE, GOON} = this.data;
                            Object.keys(values).forEach(item => obj[item] = values[item]);
                            let indexMain = '';
                            values.ABORT_POST = ABORT_POST;
                            values.CHECK_TYPE = CHECK_TYPE;
                            values.GOON       = GOON;
                            const array = this.currentValidation.RULES;

                            array.find((item: any, index: any) => {
                                if (item.id == obj.id) {
                                    indexMain = index;
                                    return true;
                                }
                                return false
                            });
                            `${indexMain}` && array.splice(Number(indexMain), 1, obj);
                            this.currentValidation.RULES = array;
                            this.currentValidation._id && delete this.currentValidation._id;
                            return this.ValidationService.test(this.currentValidation.RULES)
                                .then(({}: any) => {
                                    ABORT_POST = false;
                                    CHECK_TYPE = false;
                                    GOON = false;
                                    MessageToast.showSuccess('Successfully edit rule');
                                    this.dataGrid.instance.refresh();
                                })
                                .catch(() => {
                                    MessageToast.showError('Error update rule');
                                    return {data: [], totalCount: 0};
                                });
                        },
                        remove: (objMain: any) => {
                            let indexMain = '';
                            const array = this.currentValidation.RULES;

                            array.find((item: any, index: any) => {
                                if (item.id == objMain.id) {
                                    indexMain = index;
                                    return true;
                                }
                                return false
                            });
                            `${indexMain}` && array.splice(Number(indexMain), 1, objMain);
                            this.currentValidation.RULES = array;
                            this.currentValidation._id && delete this.currentValidation._id;
                            return this.ValidationService.test(this.currentValidation.RULES)
                                .then(() => {
                                    this.dataGrid.instance.refresh();
                                    MessageToast.showSuccess('Successfully remove rule');
                                })
                                .catch(() => {
                                    MessageToast.showError('Error remove rule');
                                    return {data: [], totalCount: 0};
                                });
                        }
                    })
                });

            })
    }

    changeData = ({ value }: any, data: any, type: string) => {
        let changeData = this.currentValidation.RULES.find((item: any) => item.id === data.id);
        if (changeData) changeData[type] = value;
        data[type] = value;
    };

    getData(): void | Promise<any> | any {
        if (this.one) {
            if (this.viewMode === 'add') return this.ValidationService.test([this.currentValidation]);
            return this.ValidationService.getRules(this.viewName, this.viewMode === 'add' ? false : this.viewName)
        } else {
            return this.ValidationService.test([this.currentValidation])
        }
    }

    saveValid(flag:any = true) {
        this.currentValidation.RULES = this.currentValidation.RULES.map((item: any) => {
            item.SEQ = Number(item.SEQ);
            item.indexes && delete item.indexes;
            return item;
        });
        this.ValidationService.setRules(new VALIDATION(this.currentValidation))
            .subscribe(
                () => flag ?
                    this.router.navigateByUrl(`configuration/validations/validation-rules`) :
                    this.dataGrid.instance.refresh(),
                () => MessageToast.showError('Error create')
            )

    }


    onToolbarPreparingCustom(e: any) {
        const arrayButton = [
            {
                widget: "dxButton",
                options: {
                    hint: 'Add',
                    icon: "add", onClick: () => {
                        this.data.GO_ON = false;
                        this.data.ABORT_POST = false;
                        this.data.CHECK_TYPE = '';
                        this.dataGrid.instance.addRow()
                    }
                },
                location: "after"
            },
            {
                widget: "dxButton",
                options: {
                    hint: 'Refresh',
                    icon: "refresh", onClick: () => e.component.refresh()
                },
                location: "after"
            },
        ];

        e.toolbarOptions.items = [...arrayButton, ...e.toolbarOptions.items];
    }

    buttonAdd = ({ row }: any) => !row.data.Pred;

    sortingValue = (event: any) => event.value == null && this.dataGrid.instance.refresh();

    click_in_Icon({ key, rowIndex }: any, name: string) {
        if(name === 'edit'){
            this.data.GOON = key.GOON;
            this.data.ABORT_POST = key.ABORT_POST;
            this.data.CHECK_TYPE = key.CHECK_TYPE;
            this.dataGrid.instance.editRow(rowIndex);
        }
        name === 'delete' && this.dataGrid.instance.deleteRow(rowIndex);
        name === 'add' && this.dataGrid.instance.addRow();
    }

    navBack() {
        confirm('Continue without saving?', '')
            .then(res => res && this.router.navigateByUrl('/configuration/validations/validation-rules'));
    }
    getIndexes(data:any){
        return JSON.parse(JSON.stringify(data))
            .map((item:any, index:any) => index + 1)
            // .filter((item:any) => item != data.rowIndex);
    }
    changePosition(e:any){
        const item = this.currentValidation.RULES.splice(e.previousValue -1 , 1);
        this.currentValidation.RULES.splice(e.value - 1 , 0, item[0]);
        const arrIndex = this.getIndexes(this.currentValidation.RULES);
        this.currentValidation.RULES = this.currentValidation.RULES.map((item: any) => {
            item.indexes = arrIndex;
            return item;
        });

        this.saveValid(false)
    }
}
