import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LogicalSystemService} from '../service/logical-system.service';
import {MessageToast} from '../../../../shared/helpers/message-toast';
import {Message} from '@angular/compiler/src/i18n/i18n_ast';

@Component({
    selector: 'app-logical-system',
    templateUrl: './logical-system.component.html',
    styleUrls: ['./logical-system.component.scss']
})
export class LogicalSystemComponent {


    logicalSys: any;
    addRows = true;
    updateLogical: any;
    deleteKeyValue: any;
    isPopupVisible: boolean = false;
    message: any;
    keyValue: any;
    employee: any;
    updateValue: any;
    dataSource = Array();
    gridContainer: any;
    buttonOptions: any;
    customizeExcelCell: any;
    window: any;

    constructor(
        public logicalSystemService: LogicalSystemService,
        private router: Router)
    {
        this.employee = {
            "LOGICAL_SYSTEM": "",
            "SYSTEM_TYPE": "",
            "URL": "",
            "UNAME": "",
            "PASSWD": "",
            "API_KEY": "",
            "ACTIVE": true,
            "DESCRIPTION_TRANSLATE": [
                {
                    "LANG": "EN",
                    "VALUES": {
                        "DESCRIPTION": ""
                    }
                }
            ]
        }
    }

    ngOnInit() {
        console.log(sessionStorage.getItem('mode'));
        if (sessionStorage.getItem('mode')) {
            let data: any = this.logicalSystemService.getDataDemo();
            this.dataSource = data;
        } else {
            this.fetchData();
        }
    }

    fetchData() {
        this.logicalSystemService.getData().then(
            (data: any) => {
                // this.isPopupVisible = true;
                this.dataSource = data.map((data2: any) => {
                    data2.DESCRIPTION = data2.DESCRIPTION_TRANSLATE[0].VALUES.DESCRIPTION;
                    return data2;
                });
            }, () => MessageToast.showError('Data not Fetch'))
    }

    fetchDataLogical(args: any) {
        if (!args.validationGroup.validate().isValid) return;

        this.logicalSystemService.getDataLogical(this.logicalSys)
            .then(
            (data: any) => {
                this.isPopupVisible = true;
                this.message = data;
            }, () => MessageToast.showError('Data not Fetch'))
    }

    pushData(e: any) {
        // if (!args.validationGroup.validate().isValid) {
        //   return;
        // }
        for (let keyValue in e.data) {
            this.employee[keyValue] = e.data[keyValue];
        }
        this.employee.DESCRIPTION_TRANSLATE[0].VALUES.DESCRIPTION = e.data.DESCRIPTION;
        delete this.employee.DESCRIPTION;
        console.log(this.employee);
        this.logicalSystemService.saveData(this.employee).then((result) => {
            MessageToast.showSuccess('Data Saved')
            this.addRows = true;
            this.message = "Data saved successfully";
            this.fetchData();
            //this.buttonOptions.resetValues();
        }, (err) => {
            this.dataSource.pop()
            if (err.includes(400)) {
                MessageToast.showError('Logical System already exists. Data not saved.')
            } else {
                MessageToast.showError('Data not Saved')
            }
        });

        // args.validationGroup.reset();
    }

    putData(e: any) {
        for (let keyValue in e.key) {
            this.employee[keyValue] = e.key[keyValue];
        }
        this.employee.DESCRIPTION_TRANSLATE[0].VALUES.DESCRIPTION = e.key.DESCRIPTION;
        delete this.employee.DESCRIPTION;
        this.logicalSystemService.putDataKey(this.employee)
            .then(() => MessageToast.showSuccess('Data updated successfully'),
                () => MessageToast.showError('Data not Updated'));
        this.employee.LOGICAL_SYSTEM = "";
        this.employee.SYSTEM_TYPE = "";
        this.employee.ACTIVE = true;
        this.employee.DESCRIPTION_TRANSLATE[0].VALUES[0].DESCRIPTION = "";
        this.employee.URL = "";
        this.employee.PASSWD = "";
        this.employee.UNAME = "";

    }

    deleteData(args: any) {
        console.log(args)
        this.logicalSystemService.deleteData(args.data.LOGICAL_SYSTEM)
            .then(
            () => MessageToast.showSuccess("Data deleted successfully"),
            () => MessageToast.showError("Data not deleted"))
    }

    onInitNewRow(e: any) {
        // this.router.navigate(['operational']);
        this.addRows = false;
    }

    onToolbarPreparing(e: any) {
        e.toolbarOptions.items.unshift({
            location: 'after',
            widget: 'dxButton',
            options: {
                icon: 'refresh',
                hint: 'Refresh',
                onClick: this.refreshDataGrid.bind(this)
            }
        });
    }

    refreshDataGrid() {
        this.fetchData();
    }

    // backToGrid() {
    //   this.addRows = true;
    // }

    form_fieldDataChanged(e: any) {
        // let updatedField = e.dataField;
        // let newValue = e.value;
        // console.log(updatedField);
        // console.log(e._component.option("formData"));
        this.employee = e.component.option("formData");
        // console.log(this.employee);
        this.buttonOptions = e.component;
        // Event handling commands go here
    }

    onRowUpdating(e: any) {
        console.log(e.key);
    }

    editLog(e: any) {
        this.addRows = true;
        e.data.PASSWD = '********';
        e.data.API_KEY = '******************';
    }
}
