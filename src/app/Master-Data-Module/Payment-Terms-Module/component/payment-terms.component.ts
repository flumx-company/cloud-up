import {Component, OnInit} from '@angular/core';
import {PaymentTermsService} from '../service/payment-terms.service';
import {MessageToast} from '../../../shared/helpers/message-toast';
import {LogicalSystemService} from '../../../Configuration-Module/Technical-Configuration-Module/Logical-System-Module/service/logical-system.service';


@Component({
    selector: 'app-payment-terms',
    templateUrl: './payment-terms.component.html',
    styleUrls: ['./payment-terms.component.scss']
})
export class PaymentTermsComponent implements OnInit {
    dataSource = Array();
    isPopupVisible: any;
    currency = Array();
    shippersData = Array();
    selectedItem: any;
    // selectedTerms: any;
    paymentTerms: any;
    // paymentTermSet: any;
    gridView = Array();
    editValue: any;
    message: any;
    keyValue: any;
    updateValue: any;
    lang: any;
    defLength2 :any;
    editing: boolean = false;
    addNew: boolean = false;
    // dataSaved: boolean = false;
    dataset:any = {
        "PAY_TERMS": [
            {
                "ZTERM": "",
                "DESCRIPTION_TRANSLATE": []
            }
        ]
    };

    constructor(
        public paymentTermsService: PaymentTermsService,
        public logicalSystemService: LogicalSystemService) {
    }

    ngOnInit() {
        this.fetchData();
        this.logicalSystem();
    }

    logicalSystem() {
        this.logicalSystemService.getData()
            .then(
                (data: any) => this.shippersData = data.map( (officer: any) => officer.LOGICAL_SYSTEM),
                (err) => console.log(err)
            )
    }

    fetchData() {
        this.paymentTermsService.getData()
            .then(
            (data: any) => {
                // this.dataSource = [];
                var data2 = new Array();
                 data.map(((payM: any) => {
                    if (Array.isArray(payM.PAY_TERMS) && payM.PAY_TERMS.length) {
                        payM.PAY_TERMS.map((arr: any) => {
                            arr.AWSYS = payM.AWSYS;
                            arr.LANG = '';
                            arr.LABEL = '';
                            arr.DESCRIPTION_TRANSLATE.forEach((DESCRIPTION: any) => {
                                arr.LANG += DESCRIPTION.LANG + ',';
                                arr.LABEL += DESCRIPTION.LANG+ '/' + DESCRIPTION.VALUES.LABEL + ',';
                            });
                            arr.LANG = arr.LANG.substring(0, arr.LANG.length - 1);
                            arr.LABEL = arr.LABEL.substring(0, arr.LABEL.length - 1);
                            data2.push(arr)
                            return arr;
                        })
                    }
                }));
                this.dataSource = data2;
                this.setFilter();
            }, () => MessageToast.showError('Data not fetch'))
    }

    setFilter() {
        setTimeout(() => {
            this.defLength2 = navigator.language.slice(0, 2).toUpperCase();
        }, 100);
    }

    onEditingStart(e: any) {
        this.editing = true;
        this.addNew = false;
        this.paymentTerms = '';
        this.editValue = e.key.AWSYS;
        this.paymentTerms = e.key.ZTERM;
        this.updateValue = e.key.ZTERM;
        let newGrid = JSON.parse(JSON.stringify(e.key.DESCRIPTION_TRANSLATE));
        this.currency = newGrid.map((val: any) => {
            val.VALUES = val.VALUES.LABEL;
            return val
        })
    }

    navBack() {
        this.editing = false;
        this.currency = [];
    }

    onInitNewRow() {
        this.editing = true;
        this.addNew = true;
        this.editValue = '';
        this.paymentTerms = '';
        // this.paymentTermSet = '';
    }

    onValueChanged(e: any) {
        let filterData = this.gridView.filter(data => data.ZTERM == e.value);
        let newGrid = JSON.parse(JSON.stringify(filterData));
        this.currency = newGrid[0].DESCRIPTION_TRANSLATE.map((val: any) => {
            val.VALUES = val.VALUES[0].LABEL;
            return val
        })
    }

    pushData() {
        this.paymentTermsService.saveData(this.selectedItem, this.dataset)
            .then(() => {
                this.fetchData();
                MessageToast.showSuccess('Data Saved');
                this.navBack();
            },
           (err) =>{
            err.status == '304' ?
            MessageToast.showError('Payment term already exists. Data not saved.') :
            MessageToast.showError('Data not Saved')
           })
    }

    putData() {
        this.paymentTermsService.putDataKey(this.selectedItem, this.updateValue, this.dataset)
            .then(
                () => {
                    this.fetchData();
                    MessageToast.showSuccess('Data Updated');
                    this.navBack()
                },
                () => MessageToast.showError('Data not Updated'));
    }

    deleteData(e: any) {
        this.paymentTermsService.deleteData(e.data.AWSYS, e.data.ZTERM)
            .then(
            () => MessageToast.showSuccess('Data deleted'),
            () => MessageToast.showError('Data not deleted')
            )
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
        if (this.selectedItem && this.paymentTerms && this.currency.length > 0 && this.addNew) {
            this.dataset.PAY_TERMS[0].ZTERM = this.paymentTerms;
            this.dataset.PAY_TERMS[0].DESCRIPTION_TRANSLATE = obj;
            this.pushData();
        }

        if (this.selectedItem && this.paymentTerms && this.currency.length > 0 && !this.addNew) {
            this.dataset.PAY_TERMS[0].ZTERM = this.paymentTerms;
            this.dataset.PAY_TERMS[0].DESCRIPTION_TRANSLATE = obj;
            this.putData();
        }
    }
}
