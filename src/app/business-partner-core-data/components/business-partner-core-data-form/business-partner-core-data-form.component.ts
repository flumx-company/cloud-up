import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-business-partner-core-data-form',
  templateUrl: './business-partner-core-data-form.component.html',
  styleUrls: ['./business-partner-core-data-form.component.css']
})
export class BusinessPartnerCoreDataFormComponent implements OnInit {
  mode = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.children[0].url.subscribe(url => {
      this.mode = url[0].path;
    });
  }
}
