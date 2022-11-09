import { Component, OnInit } from '@angular/core';
import { StatusesApiService } from '../../../../api-doc/services/statuses-api.service';
import { MessageToast } from '../../../../shared/helpers/message-toast';

@Component({
    selector: 'app-main-status',
    templateUrl: './main-status.component.html',
    styleUrls: ['./main-status.component.scss']
})
export class MainStatusComponent implements OnInit {

    isPopupVisible: boolean = false;
    message: any;
    dataSource = Array();
    REC_TYPE: any;
    STATUS: any;
    dataStructure: any;
    customizeExcelCell: any;
    cloneIconClick: any;
    onInitNewRow: any;
    onRowUpdating: any;

    constructor(public apiService: StatusesApiService) {
        this.dataStructure = {
            "STATUSES": [
                {
                    "STATUS": 0,
                    "UI_MODE": "",
                    "MYACTIONLIST": true,
                    "DESCRIPTION_TRANSLATE": [
                        {
                            "LANG": "EN",
                            "VALUES": {
                                "LABEL": ""
                            }
                        }
                    ]
                }
            ]
        }
    }

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.apiService.getData().then(
            (data: any) => {
                console.log(data);
                this.REC_TYPE = data.REC_TYPE;
                this.dataSource = data.STATUSES.map((data2: any) => {
                    data2.DESCRIPTION = data2.DESCRIPTION_TRANSLATE[0].VALUES.LABEL;
                    return data2
                });
            }, err => {
                this.isPopupVisible = true;
                this.message = err;
            })
    }

    pushData(e: any) {
        for (let keyValue in e.data) {
            this.dataStructure.STATUSES[0][keyValue] = e.data[keyValue];
        }
        this.dataStructure.STATUSES[0].DESCRIPTION_TRANSLATE[0].VALUES.LABEL = e.data.DESCRIPTION;
        delete this.dataStructure.STATUSES[0].DESCRIPTION;
        delete this.dataStructure.STATUSES[0].__KEY__;
        console.log(this.dataStructure)
        this.apiService.saveData(this.dataStructure, this.REC_TYPE).then(() => {
            // this.isPopupVisible = true;
            // this.message = result;
            MessageToast.showSuccess('Successfully Added')
        }, (err) => {
            this.dataSource.pop();
            err.includes(304) ?
                MessageToast.showError('Status already existStatus already exists. Data not saved.') :
                MessageToast.showError('Data not Saved')

        });
    }

    putData(e: any) {
        for (let keyValue in e.key) {
            this.dataStructure.STATUSES[0][keyValue] = e.key[keyValue];
        }
        this.dataStructure.STATUSES[0].DESCRIPTION_TRANSLATE[0].VALUES.LABEL = e.key.DESCRIPTION;
        delete this.dataStructure.STATUSES[0].DESCRIPTION;
        this.apiService.putDataKey(this.STATUS, this.REC_TYPE, this.dataStructure)
            .then(
                () => MessageToast.showSuccess('Successfully Updated'),
                () => MessageToast.showError('Data Not Updated')
            );
    }

    deleteData(args: any) {

        this.apiService.deleteDataKey(this.REC_TYPE, args.data.STATUS)
            .then(
                () => MessageToast.showSuccess('Successfully Deleted'),
                () => MessageToast.showError('Data Not Deleted')
            )
    }

    onToolbarPreparing(e: any) {
        e.toolbarOptions.items.unshift({
            location: 'after',
            widget: 'dxButton',
            options: {
                icon: 'refresh',
                onClick: this.refreshDataGrid.bind(this)
            }
        });
    }

    refreshDataGrid() {
        this.fetchData();
    }

    editLog = (e: any) => this.STATUS = e.data.STATUS;


}
