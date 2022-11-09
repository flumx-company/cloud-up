import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'router-menu',
  templateUrl: './router-menu.component.html',
  styleUrls: ['./router-menu.component.scss']
})
export class RouterMenuComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
    console.log(this.router)
  }
}
