import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild
} from '@angular/core';

import {
    ActivatedRoute,
    Router
} from '@angular/router';
import {DxDataGridComponent} from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';

import {confirm} from 'devextreme/ui/dialog';

import {InfoPopupComponent} from '../../../../../shared/components/info-popup/info-popup.component';
import {DataGridUtil} from '../../../../../shared/helpers/data-grid-util';
import {MessageToast} from '../../../../../shared/helpers/message-toast';

import {ConditionService} from "../../_service/condition.service";
import {Subject} from "rxjs";

import 'rxjs/add/operator/takeUntil';

@Component({
    selector: 'app-conditions-home',
    templateUrl: './conditions-home.component.html',
    styleUrls: ['./conditions-home.component.css']
})

export class ConditionsHomeComponent implements OnInit, OnDestroy {

    @ViewChild(InfoPopupComponent) infoPopup?: InfoPopupComponent;
    @ViewChild('conditionGrid') conditionGrid?: DxDataGridComponent;
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

    private componentDestroyed: Subject<any> = new Subject();
    customizeColumns = DataGridUtil.customizeColumns;
    dataSource: DataSource;
    popupVisible = false;
    currentEmployee: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private conditionService: ConditionService) {

        this.dataSource = new DataSource({
            store: new CustomStore({
                load: (params) => this.conditionService.getConditions()
                    .toPromise()
                    .then(
                        (conditions: any) => {
                            const conditionsList: any = this.removeZero(conditions);
                            const length = conditionsList.length;
                            return {
                                data: conditionsList.splice(
                                    params && params.skip ? params.skip : 0,
                                    params && params.take ? params.take : length
                                ),
                                totalCount: length
                            };
                        })
                    .catch(() => ({data: [], totalCount: 0}))
            })
        });
    }

    ngOnInit() {
    }

    reloadConditions() {
        if (this.conditionGrid && this.conditionGrid.instance) {
            this.conditionGrid.instance.collapseAll(-1);
            setTimeout(() => this.dataSource.reload(), 150);
        }
    }

    removeZero = (conditions: any) => conditions.filter((item: any) => item.CONDITION != 0);

    sortingValue = (event: any) => event.value == null && this.dataGrid.instance.refresh();

    addCondition = () => this.router.navigate(['detail/add'], {relativeTo: this.route});

    bracesAsString = (bracesCount: number, start: boolean) => start ? '['.repeat(bracesCount) : ']'.repeat(bracesCount);


    editCondition(entityId: any, event: any) {
        event.stopImmediatePropagation();
        this.router.navigate(['detail/edit', entityId.CONDITION], {relativeTo: this.route});
    }

    removeCondition(data: any, event: any) {
        event.stopImmediatePropagation();
        confirm('Delete this condition?', '').then(res => {
            if (res) {
                this.conditionService
                    .deleteCondition(data.CONDITION)
                    .takeUntil(this.componentDestroyed)
                    .subscribe(
                        () => {
                            MessageToast.showSuccess('Condition deleted');
                            this.dataSource.reload();
                        },
                        (error: any) => console.log(error));
            }
        });
    }

    showInfo(data: any) {
        this.currentEmployee = data;
        this.popupVisible = true;
    }

    showUsageInfo(data: any) {
        data.QUERY[0].condition = data.CONDITION;
        data.QUERY = JSON.stringify(data.QUERY);
        data._id && delete data._id;
        data.CONDITION = Number(data.CONDITION);
        this.conditionService
            .updateCondition(data, data.CONDITION)
            .takeUntil(this.componentDestroyed)
            .subscribe(
                () => this.router
                    .navigate(['detail/edit', data.CONDITION], {relativeTo: this.route}),
                (error: any) => console.log(error)
            )
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
            });
    }


    onExporting(e: any) {
        e.component.beginUpdate();
        e.component.columnOption('entityId', 'visible', false);
    }

    onExported(e: any) {
        e.component.columnOption('entityId', 'visible', true);
        e.component.endUpdate();
    }

    ngOnDestroy() {
        this.componentDestroyed.next();
        this.componentDestroyed.complete();
    }
}
