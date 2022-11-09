import {Component, Input, OnInit} from '@angular/core';
import {isNullOrUndefined} from 'util';

import {InsertMetaData} from '../../models/insert-meta-data';
import {UpdateMetaData} from '../../models/update-meta-data';

@Component({
  selector: 'app-info-popup',
  templateUrl: './info-popup.component.html',
  styleUrls: ['./info-popup.component.css']
})
export class InfoPopupComponent implements OnInit {
  // tslint:disable-next-line:no-any
  infoObject: any;
  infoVisible = false;

  constructor() {
    this.infoObject = {
      insertMetadata: new InsertMetaData(),
      updateMetadata: new UpdateMetaData()
    };
  }

  ngOnInit() {}

  // tslint:disable-next-line:no-any
  showInfoForObject(infoObject: any) {
    if (isNullOrUndefined(infoObject)) {
      return;
    }

    if (isNullOrUndefined(infoObject.insertMetadata)) {
      infoObject.insertMetadata = new InsertMetaData();
    }

    if (isNullOrUndefined(infoObject.updateMetadata)) {
      infoObject.updateMetadata = new UpdateMetaData();
    }

    this.infoObject = infoObject;
    this.infoVisible = true;
  }
}
