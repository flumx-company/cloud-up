import {Component, OnInit} from '@angular/core';
import {ExceptionService} from '../service/exceptions.service';
import {MessageToast} from '../../../../shared/helpers/message-toast';


@Component({
    selector: 'app-exceptions',
    templateUrl: './exceptions.component.html',
    styleUrls: ['./exceptions.component.scss']
})
export class ExceptionComponent implements OnInit {
    dataSource = Array();
    defLength2: any;
    currency = Array();
    shippersData = Array();
    selectedItem: any;
    selectedMethod: any;
    parallelWf: boolean = false;
    priority: any;
    gridView = Array();
    editValue: any;
    oldMessage: any;
    message: any;
    updateValue: any;
    lang: any;
    editing: boolean = false;
    addNew: boolean = false;
    dataSaved: boolean = false;
    dataset = {
        "MSG_NUM": '',
        "AGENT_TYPE": '',
        "PARALLEL_WF": false,
        "PRIORITY": 0,
        "MESSAGE_TRANSLATE": Array()
    }

    constructor(public exceptionService: ExceptionService) {
    }

    ngOnInit() {
        this.fetchData();
        this.AgentType();
    }

    fetchData() {
        this.exceptionService.getData().then(
            (data: any) => {
                let data2 = data.MESSAGES.map((msg: any) => {
                    if (Array.isArray(msg.MESSAGE_TRANSLATE) && msg.MESSAGE_TRANSLATE.length) {
                        msg.LANG = '';
                        msg.MESSAGE = '';
                        msg.MESSAGE_TRANSLATE.forEach((VAl: any) => {
                            msg.LANG += VAl.LANG + ',';
                            msg.MESSAGE += VAl.LANG+ '/' + VAl.VALUES.MESSAGE + ',';
                        })
                        msg.LANG = msg.LANG.substring(0, msg.LANG.length - 1);
                        msg.MESSAGE = msg.MESSAGE.substring(0, msg.MESSAGE.length - 1);
                        // this.dataSource.push(msg);
                        return msg;
                        // console.log(this.dataSource)
                    }
                });
                this.dataSource = data2.sort((a:any,b:any)=>(a.PRIORITY)-(b.PRIORITY));
                this.setFilter()
            }, err => {
                MessageToast.showError('Data not fetch')
            })
    }

    setFilter() {
        setTimeout(() => {
            this.defLength2 = navigator.language.slice(0, 2).toUpperCase();
        }, 100);
    }

    pushData() {
        this.exceptionService.saveData(this.dataset).then((result) => {
            MessageToast.showSuccess('Data Saved');
            this.fetchData();
            this.navBack();
        }, (err) => {
            this.dataSource.pop()
            MessageToast.showError('Data not Saved');
        });
    }

    putData() {
        this.exceptionService.putDataKey(this.dataset, this.oldMessage)
            .then(() => {
                MessageToast.showSuccess('Data Updated');
                this.fetchData();
                this.navBack();
            }, () => MessageToast.showError('Data not Updated'));
    }

    deleteData(e: any) {
        this.exceptionService.deleteData(e.data.MSG_NUM).then(
            () => MessageToast.showSuccess('Data deleted'),
            () => MessageToast.showError('Data not deleted'))
    }

    onEditingStart(e: any) {
        this.editing = true;
        this.addNew = false;
        this.parallelWf = e.key.PARALLEL_WF;
        this.priority = e.key.PRIORITY;
        this.message = e.key.MSG_NUM;
        this.oldMessage = e.key.MSG_NUM;
        this.editValue = e.key.AGENT_TYPE;
        let newGrid = JSON.parse(JSON.stringify(e.key.MESSAGE_TRANSLATE));
        this.currency = newGrid.map((val: any) => {
            val.LANG = val.LANG;
            val.VALUES = val.VALUES.MESSAGE;
            return val
        })
    }

    AgentType() {
        this.exceptionService.getAgentType()
            .then((data: any) => this.shippersData = data.map( (typ: any) => typ.TYPE))
    }

    navBack() {
        this.editing = false;
        this.currency = [];
        this.parallelWf = false;
        this.priority = '';
        this.message = '';
        this.editValue = '';
    }

    onInitNewRow(e: any) {
        this.editing = true;
        this.addNew = true;
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

    saveCondition() {
        let obj = [];
        for (let i = 0; i < this.currency.length; i++) {
            let VALUES = {
                MESSAGE: ""
            }

            VALUES.MESSAGE = JSON.parse(JSON.stringify(this.currency[i].VALUES));
            obj.push({"LANG": this.currency[i].LANG, VALUES});
        }

        this.dataset.MSG_NUM = this.message;
        this.dataset.AGENT_TYPE = this.selectedItem;
        this.dataset.PARALLEL_WF = this.parallelWf;
        this.dataset.PRIORITY = this.priority;
        this.dataset.MESSAGE_TRANSLATE = obj;
        if (!this.selectedItem || !this.message || !this.currency.length) {
            MessageToast.showError('Please enter valid data');
        }

        if (this.selectedItem && this.message && this.currency.length > 0 && this.addNew) {
            this.pushData();
        }

        if (this.selectedItem && this.message && this.currency.length > 0 && !this.addNew) {
            this.putData();
        }
    }
}

