import {Component, OnInit} from '@angular/core';
import {VendorsService} from '../service/vendors.service';

@Component({
    selector: 'app-vendors',
    templateUrl: './vendors.component.html',
    styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {
    accordionFilter = ['Get a list of documents with/without filter'];
    accordionLifnr = ['Get document by lifnr'];
    accordionPost = ['Post add new document'];
    accordionPut = ['PUT update document'];
    accordionDelete = ['DELETE document'];
    isPopupVisible: any;
    deleteIifnrValue: any;
    conditionLifnr: any;
    message: any;
    keyValue: any;
    updateValue: any;
    updateLifnr: any;

    constructor(
        public vendorService: VendorsService
    ) {
    }

    ngOnInit() {
    }

    fetchData() {
        this.vendorService.getData().then(
            (data: any) => {
                this.isPopupVisible = true;
                this.message = data;
            }, err => {
                this.isPopupVisible = true;
                this.message = err;
            })
    }

    fetchDataLif(args: any) {
        if (!args.validationGroup.validate().isValid) return;

        this.vendorService.getDataLifnr(this.conditionLifnr)
            .then(
                (data: any) => {
                    this.isPopupVisible = true;
                    this.message = data;
                }, err => {
                    this.isPopupVisible = true;
                    this.message = err;
                })
    }

    pushData(args: any) {
        if (!args.validationGroup.validate().isValid) return;

        this.vendorService.saveData(this.keyValue).then((result) => {
            this.isPopupVisible = true;
            this.message = result;
        }, (err) => {
            this.isPopupVisible = true;
            this.message = err.MESSAGE;
        });

        args.validationGroup.reset();
    }

    putData(args: any) {
        if (!args.validationGroup.validate().isValid) return;

        this.vendorService.putDataKey(this.updateValue, this.updateLifnr)
            .then((result) => {
                this.isPopupVisible = true;
                this.message = result;
            }, (err) => {
                this.isPopupVisible = true;
                this.message = err.MESSAGE;
            });

        args.validationGroup.reset();
    }

    deleteData() {
        this.vendorService.deleteData(this.deleteIifnrValue)
            .then(
                (data: any) => {
                    this.isPopupVisible = true;
                    this.message = data.results;
                }, err => {
                    this.isPopupVisible = true;
                    this.message = err;
                })
    }
}
