import {Component, OnInit, OnDestroy} from '@angular/core';
import {environment} from "../environments/environment";
import {Http} from "@angular/http";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
    title = 'Alevate';
    loggedIn: boolean = false;
    uname: any;
    psw: any;
    inputRequire : boolean = false;
    invalidUser : boolean = false;

    constructor(protected http: Http) { }

    ngOnInit() {
      this.loggedIn = !!sessionStorage.getItem("token");
    }

    ngOnDestroy() {
        sessionStorage.clear();
    }

    checkUser() {
        if (this.uname && this.psw) {
          this.inputRequire = false;
          this.sendData();
        } else {
          this.inputRequire = true;
        }
    }

    sendData(){
      this
        .http
        .post(environment.login_url, {
          user: {
            email: this.uname,
            password: this.psw
          }
        })
        .subscribe((res: any) => {
          sessionStorage.setItem("token", res.json().token);
          this.loggedIn = true;
        }, err => {
          this.invalidUser = true;
          console.log(err);
        });
    }

    keyDownFunction(event: any) {
        if(event.keyCode == 13 && this.psw)
          this.checkUser();
    }
}
