import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

import {COMPANY_CODE, COMPANY_MASTER} from "../../_interface/company .interface";

import {map, switchMap} from "rxjs/operators";
import {Observable} from "rxjs";
import {combineLatest} from "rxjs/observable/combineLatest";

import {confirm} from "devextreme/ui/dialog";

import {CurrencyService} from "../../../Currency-Module/_service/currency.service";
import {CompanyCodeService} from "../../_service/company-code.service";

import {MessageToast} from "../../../../shared/helpers/message-toast";

@Component({
    selector: 'app-company-code',
    templateUrl: './company-code-detail.component.html',
    styleUrls: ['./company-code-detail.component.css']
})
export class CompanyCodeDetailComponent implements OnInit {
    companyCode: COMPANY_CODE;
    id:any;
    mode:any;
    currencyAll:any = [];
    logSystems:any = [];
    buttonOptions: any = {
        text: "Save",
        useSubmitBehavior: true
    };
    constructor(
        private route: ActivatedRoute,
        private companyService: CompanyCodeService,
        private router: Router,
        private location: Location,
        private currencyService: CurrencyService,

    ) {
        this.companyCode = new COMPANY_CODE();
        this.companyCode.MASTER = new COMPANY_MASTER()
    }

    ngOnInit() {
        const routerParams$ = this.route.params;
        const logSystem$ = this.companyService.getLogical();

        const currency$ = this.currencyService.getCurrency()
            .pipe(
                map((item:any) => {
                    let array:any = [];
                    item.forEach((itemMap:any) => {
                        // itemMap.DESCRIPTION = itemMap.DESCRIPTION.map((lang:any) => {
                        //     return {
                        //         LABEL:`${lang.LANG} ${lang.TEXT ? lang.TEXT : ''}`,
                        //         VALUE: itemMap.CURRENCY
                        //     }
                        // });
                        array.push({
                            LABEL:itemMap.CURRENCY,
                            VALUE:itemMap.CURRENCY
                        })
                    });
                    return array
                })
            );

        routerParams$.pipe(
            switchMap((params: any):any => {

                this.mode = params['mode'];
                this.id   = params['index'];

                return combineLatest(this.mode === 'add'
                    ? new Observable((observer) => observer.next(this.companyCode))
                    : this.companyService.getCompany(this.id), currency$, logSystem$)
            })
        )
            .subscribe(([company, currency, logSystem]:any):any => {
                this.companyCode = company;
                this.currencyAll = currency;
                this.logSystems = logSystem;
            })
    }
    save(){
        let data:any = {...this.companyCode};
        if (this.mode === 'add') {
            this.companyService.createCompany(data)
                .subscribe(
                    () => {
                        MessageToast.showSuccess('Company code successfully created');
                        setTimeout(() => {
                            this.router.navigateByUrl('master-data/company-code')
                        }, 2000)
                    },
                    () => MessageToast.showError(`Company code don't be created, because`)
                )
        } else {
            data._id && delete data._id;
            this.companyService.updateCompany(data, data.MASTER.BUKRS)
                .subscribe(
                    () => {
                        MessageToast.showSuccess('Company code successfully modified');
                        setTimeout(() => {
                            this.router.navigateByUrl('master-data/company-code')
                        }, 2000)
                    },
                    () => MessageToast.showError(`Company code don't be modified`)
                )
        }
        return false;
    }
    navBack = () => confirm('Continue without saving?', '').then(res => res && this.location.back());

    getValueCurrency = () => this.companyCode.MASTER.WAERS;


}
