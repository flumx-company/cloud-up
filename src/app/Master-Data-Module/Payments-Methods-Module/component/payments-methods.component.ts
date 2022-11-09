import {Component, OnInit} from '@angular/core';
import {PaymentMethodsService} from "../../../api-doc/services/payment-methods.service";
import {LogicalSystemService} from "../../../Configuration-Module/Technical-Configuration-Module/Logical-System-Module/service/logical-system.service";
import {MessageToast} from "../../../shared/helpers/message-toast";


@Component({
    selector: 'app-payments-methods',
    templateUrl: './payments-methods.component.html',
    styleUrls: ['./payments-methods.component.scss']
})
export class PaymentsMethodsComponent implements OnInit {
    dataSource: any | Array<any> = [];
    currency: any | Array<any> = [];
    shippersData: any | Array<any> = [];
    selectedItem: any;
    // selectedMethod: any;
    paymentMethod: any;
    // paymentMethodSet: any;
    // gridView = Array();
    editValue: any;
    keyValue: any;
    updateValue: any;
    lang: any;
    editing: boolean = false;
    addNew: boolean = false;
    // dataSaved: boolean = false;
    defLength2: any;
    dataset:any = {
        "PAY_METHODS": [
            {
                "PAYMETHOD": "",
                "DESCRIPTION_TRANSLATE": []
            }
        ]
    };

    constructor(
        public paymentMethodsService: PaymentMethodsService,
        public logicalSystemService: LogicalSystemService
    ) {
    }

    ngOnInit() {
        this.fetchData();
        this.logicalSystem();
    }

    fetchData() {
        this.paymentMethodsService.getData().then(
            (data: any) => {


            let data2 = new Array() 
            data.map(((payM: any) => {
                    if (Array.isArray(payM.PAY_METHODS) && payM.PAY_METHODS.length) {
                      return  payM.PAY_METHODS.map((arr: any) => {
                            arr.AWSYS = payM.AWSYS;
                            arr.LANG = '';
                            arr.LABEL = '';
                            arr.DESCRIPTION_TRANSLATE.forEach((DESCRIPTION: any) => {
                            arr.LANG += DESCRIPTION.LANG + ',';
                            arr.LABEL += DESCRIPTION.LANG+ '/' + DESCRIPTION.VALUES.LABEL + ',';
                            });
                            arr.LANG = arr.LANG.substring(0, arr.LANG.length - 1);
                            arr.LABEL = arr.LABEL.substring(0, arr.LABEL.length - 1);
                            // this.dataSource.push(arr);
                            data2.push(arr)
                            return arr
                        })
                    }
                }));
                this.dataSource = data2;
                this.setFilter()
            }, () => MessageToast.showError('Data not fetch'))
    }

    setFilter = () =>setTimeout(() => this.defLength2 = navigator.language.slice(0, 2).toUpperCase(), 100);

    pushData() {
        this.paymentMethodsService.saveData(this.dataset, this.selectedItem)
            .then(() => {
                this.fetchData();
                MessageToast.showSuccess('Data Saved');
                this.navBack()
            }, (err) =>{
                err.status == '304' ?
                MessageToast.showError('Payment method already exists. Data not saved.') :
                MessageToast.showError('Data not Saved')
            })
    }

    putData() {
        this.paymentMethodsService.putDataKey(this.dataset, this.selectedItem, this.updateValue)
            .then(() => {
                this.fetchData();
                MessageToast.showSuccess('Data Updated');
                this.navBack()
            }, (err) => {
                MessageToast.showError('Data not Updated')
            });
    }

    deleteData(e: any) {
        this.paymentMethodsService.deleteData(e.data.AWSYS, e.data.PAYMETHOD).then(
            () => {
                MessageToast.showSuccess('Data deleted');
            }, () => {
                MessageToast.showError('Data not deleted');
            })
    }

    onEditingStart(e: any) {
        this.editing = true;
        this.addNew = false;
        this.paymentMethod = '';
        this.editValue = e.key.AWSYS;
        this.paymentMethod = e.key.PAYMETHOD;
        this.updateValue = e.key.PAYMETHOD;
        let newGrid = JSON.parse(JSON.stringify(e.key.DESCRIPTION_TRANSLATE));
        this.currency = newGrid.map((val: any) => {
            val.VALUES = val.VALUES.LABEL;
            return val
        })
    }

    logicalSystem() {
        this.logicalSystemService.getData()
            .then(
            (data: any) => this.shippersData = data.map( (officer: any) => officer.LOGICAL_SYSTEM),
            () => {}
            )
    }

    navBack() {
        this.editing = false;
        this.currency = [];
    }

    onInitNewRow() {
        this.editing = true;
        this.addNew = true;
        this.paymentMethod = '';
        this.editValue = '';
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

    saveCondition() {
        let obj = [];
        for (let i = 0; i < this.currency.length; i++) {
            let VALUES = {LABEL: ""};
            VALUES.LABEL = JSON.parse(JSON.stringify(this.currency[i].VALUES));
            obj.push({"LANG": this.currency[i].LANG, VALUES});
        }
        if (this.selectedItem && this.paymentMethod && this.currency.length > 0 && this.addNew) {
            this.dataset.PAY_METHODS[0].PAYMETHOD = this.paymentMethod;
            this.dataset.PAY_METHODS[0].DESCRIPTION_TRANSLATE = obj;
            this.pushData();
        }

        if (this.selectedItem && this.paymentMethod && this.currency.length > 0 && !this.addNew) {
            this.dataset.PAY_METHODS[0].PAYMETHOD = this.paymentMethod;
            this.dataset.PAY_METHODS[0].DESCRIPTION_TRANSLATE = obj;
            this.putData();
        }
    }
}
