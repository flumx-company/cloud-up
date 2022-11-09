import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'validations-menu',
  templateUrl: './validations-menu.component.html',
  styleUrls: ['./validations-menu.component.scss']
})
export class ValidationsMenuComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
    console.log(this.router)
  }
}
