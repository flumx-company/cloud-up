import {Component} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {OperationalService} from '../../services/operational.service';
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-operational',
    templateUrl: './operational.component.html',
    styleUrls: ['./operational.component.scss']
})
export class OperationalComponent {
    message: any;
    isPopupVisible: any;
    accordionLive = ['Ckeck if service live'];
    accordionWork = ['Ckeck if service ready to work'];
    safeSrc: SafeResourceUrl;
    thumbnail: any;

    constructor(private OperationalService: OperationalService, private sanitizer: DomSanitizer) {
        const token = sessionStorage.getItem("token");
        this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
            `${environment.bypassSecurityTrustResourceUrl}search/normal-route/?token=${token}`
        );

    }

    // fetchDataLive() {
    //     this.OperationalService.getDataLive().then(
    //         (data: any) => {
    //             this.isPopupVisible = true;
    //             this.message = data.status;
    //         }, err => {
    //             this.isPopupVisible = true;
    //             this.message = err;
    //         })
    // }
    //
    // fetchDataReady() {
    //     this.OperationalService.getDataReady().then(
    //         (data: any) => {
    //             this.isPopupVisible = true;
    //             this.message = data.status;
    //         }, err => {
    //             this.isPopupVisible = true;
    //             this.message = err;
    //         })
    // }
}
