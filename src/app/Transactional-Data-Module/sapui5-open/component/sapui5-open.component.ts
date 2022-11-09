import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import {environment} from "../../../../environments/environment";


@Component({
    selector: 'sapUi5',
    templateUrl: './sapui5-open.component.html',
    styleUrls: ['./sapui5-open.component.scss']
})
export class sapUi5 implements OnInit {
    safeSrc: SafeResourceUrl;
    thumbnail: any;

    constructor(private sanitizer: DomSanitizer, private router: ActivatedRoute) {



        this.router.queryParams.subscribe(data => {

            var jsonStr = data.parameterName.replace(/(\w+:)|(\w+ :)/g, function (s: any) {
                return '"' + s.substring(0, s.length - 1) + '":';
            });
            const base = environment.bypassSecurityTrustResourceUrl;
            var obj = JSON.parse(jsonStr);
            console.log(typeof (obj));
            if (typeof (obj) == 'number') {
                this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(base + data.ROUTING_PATTERN + "/" + obj + "?" + "token=" + sessionStorage.getItem("token"));
                console.log(this.safeSrc);
            } else {
                let createUrl = '';
                for (var prop in obj) {
                    createUrl += prop + '=' + obj[prop] + '&';
                }
                this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(base + data.ROUTING_PATTERN + "/?" + createUrl + "token=" + sessionStorage.getItem("token"));
                console.log(this.safeSrc);
            }

            //
        //     let jsonStr = data.parameterName.replace(/(\w+:)|(\w+ :)/g,  (s: any) => `"${s.substring(0, s.length - 1)}":`);
        //
        //     let obj = JSON.parse(jsonStr);
        //
        //     if (typeof (obj) == 'number') {
        //         this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.getUrlParams(data, obj));
        //     } else {
        //         let createUrl = '';
        //         for (let prop in obj) {
        //             createUrl += prop + '=' + obj[prop] + '&';
        //         }
        //         this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.getUrlParams(data, createUrl));
        //     }
        //
        });
    }

    ngOnInit() { }

    getUrlParams(data:any, str:any) {
        return `${environment.bypassSecurityTrustResourceUrl}${data.ROUTING_PATTERN}/?${str}token=${sessionStorage.getItem("token")}`;
    }

}
