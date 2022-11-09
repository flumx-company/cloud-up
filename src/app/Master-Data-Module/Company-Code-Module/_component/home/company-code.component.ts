import {Component, OnInit, ViewChild} from '@angular/core';
import {DxDataGridComponent} from "devextreme-angular/ui/data-grid";
import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";
import {CompanyCodeService} from "../../_service/company-code.service";
import {ActivatedRoute, Router} from "@angular/router";
import {confirm} from "devextreme/ui/dialog";
import {DataGridUtil} from "../../../../shared/helpers/data-grid-util";
import {MessageToast} from "../../../../shared/helpers/message-toast";


@Component({
    selector: 'app-company-code',
    templateUrl: './company-code.component.html',
    styleUrls: ['./company-code.component.css']
})
export class CompanyCodeComponent implements OnInit {

    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    customizeColumns = DataGridUtil.customizeColumns;
    dataSource: DataSource;

    constructor(
        private companyService: CompanyCodeService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.dataSource = new DataSource({
            store: new CustomStore({
                load: (loadOptions) => this.companyService.getCompanies()
                    .toPromise()
                    .then(
                        (conditions:any) => {
                            const length = conditions.length;
                            return {
                                data:       conditions ? conditions.splice(
                                    loadOptions && loadOptions.skip ? loadOptions.skip : 0,
                                    loadOptions && loadOptions.take ? loadOptions.take : length
                                ) : [],
                                totalCount: conditions ? length : 0
                            };
                        })
                    .catch(error =>{
                        console.log(error);
                        return {data: [], totalCount: 0};
                    })
            })
        });
    }

    ngOnInit() {}

    edit = (data:any) => this.router.navigateByUrl(`master-data/company-code/edit/${data.MASTER.BUKRS}`);

    remove = (data:any) =>  {
        confirm('Are you sure you want to delete the record?', '')
            .then(res => {
                if (res) {
                    this.companyService.deleteCompany(data.MASTER.BUKRS)
                    .subscribe(() => {
                        MessageToast.showSuccess('Company code deleted');
                        this.dataSource.reload();
                    },
                    (error:any) => MessageToast.showError(`Company code don't be deleted : ${error.message}`));
                }
            });
    };

    sortingValue = (event: any) => event.value == null && this.dataGrid.instance.refresh();

    onToolbarPreparingCustom(e: any) {
        const arrayButton = [
            {
                widget: "dxButton",
                options: {
                    hint: 'Add',
                    icon: "add", onClick: () => this.router.navigate([`add`], {relativeTo: this.route}),
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

    onExporting(e: any) {
        e.component.beginUpdate();
        e.component.columnOption('entityId', 'visible', false);
    }

    onExported(e: any) {
        e.component.columnOption('entityId', 'visible', true);
        e.component.endUpdate();
    }

}
