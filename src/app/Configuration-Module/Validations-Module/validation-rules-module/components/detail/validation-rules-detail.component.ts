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
import {RULES, VALIDATION} from "../../interfaces/validation.interface";
import {Location} from "@angular/common";
import {_catch} from "rxjs/operator/catch";

@Component({
    selector: 'validations-detail',
    templateUrl: './validation-rules-detail.component.html',
    styleUrls: ['./validation-rules-detail.component.scss']
})

export class ValidationRulesDetailComponent implements OnInit {
    @ViewChild(InfoPopupComponent) infoPopup?: InfoPopupComponent;
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    customizeColumns = DataGridUtil.customizeColumns;
    viewMode: any;
    viewName: any;
    record: any = [];
    value: any = [];
    one = true;
    staticValue:any = {};
    data: any = new RULES();
    buttonOptions: any = {
        text: "Save",
        useSubmitBehavior: true
    };
    rulesList = RulesList.list;

    constructor(
        private ValidationService: ValidationRulesService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location

    ) {}

    ngOnInit() {
        const routerParams$ = this.route.params;

        routerParams$
            .pipe(
                switchMap(({ mode, id }: RouterInterface) => {
                    this.viewMode = mode;
                    this.viewName = id;
                    return mode == 'add' ?  Promise.resolve(this.data) : this.ValidationService.getRules()
                })
            )
            .subscribe((res:any) => {
                if(this.viewMode != 'add') {
                    this.staticValue = res;
                    this.data = res.RULES[this.viewName]
                }
            })
    }

    navBack = () => confirm('Continue without saving?', '').then(res => res && this.location.back());

    saveValid () {
        this.data.SEQ = Number(this.data.SEQ);
        if(this.viewMode == 'add') {
            this.ValidationService.createRule({RULES: [{...this.data}]})
                .toPromise()
                .then(() => this.router.navigateByUrl(`configuration/validations/validation-rules`))
                .catch(err =>{
                    MessageToast.showError(err && err.MESSAGE ? err.MESSAGE : 'Error create rule or sequence has been taken')
                })
        } else {
            this.ValidationService.updateRule(this.staticValue.RULES[this.viewName], {...this.data})
                .toPromise()
                .then(() => this.router.navigateByUrl(`configuration/validations/validation-rules`))
                .catch(err => MessageToast.showError(err && err.MESSAGE ? err.MESSAGE : 'Error update rule'))
        }
    }
}
