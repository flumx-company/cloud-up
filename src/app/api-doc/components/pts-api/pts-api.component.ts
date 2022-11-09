import { Component, OnInit } from '@angular/core';
import { PtsApiService } from './../../services/pts-api.service';


@Component({
  selector: 'app-pts-api',
  templateUrl: './pts-api.component.html',
  styleUrls: ['./pts-api.component.scss']
})
export class PtsApiComponent implements OnInit {

  accordionList = ['Get a list of pts records with/without filter'];
  accordionRECNO = ['Get pts by recno'];
  accordionHist = ['Get a history of pts'];
  accordionAppro = ['Get a list of pts approvers'];
  accordionStatus = ['Get list of pts of different status - myApprovals, myDrafts or mySubmissions'];
  accordionValid = ['Validate pts record by record number'];
  accordionPost = ['Post add new pts record'];
  accordionPut = ['PUT update pts'];
  accordionDelete = ['DELETE pts'];
  condition: any;
  keyValue: any;
  deleteKeyValue: any;
  putValue: any;
  updateValue: any;
  conditionVal: any;
  conditionAppro: any;
  conditionCon: any;
  conditionHist: any;
  isPopupVisible: any;
  message: any;
  ptsStatus: any;
  selectedStatus: any;
  isDropDownBoxOpened: any;

  constructor(public ptsApiService: PtsApiService) {
    this.ptsStatus = ["myApprovals", "myDrafts", "mySubmissions"];
    this.selectedStatus = this.ptsStatus[0];
    this.isDropDownBoxOpened = false;
  }

  ngOnInit() {
  }

  changeDropDownBoxValue(args: any) {
    this.selectedStatus = args.addedItems[0];
    this.isDropDownBoxOpened = false;
  }

  fetchData(args: any) {
    this.ptsApiService.getData().then(
      (data: any) => {
        this.isPopupVisible = true;
        this.message = data;
      }, err => {
        this.isPopupVisible = true;
        this.message = err;
      })
  }

  fetchDataCon(args: any) {
    this.ptsApiService.getDataCon(this.conditionCon).then(
      (data: any) => {
        this.isPopupVisible = true;
        this.message = data;
      }, err => {
        this.isPopupVisible = true;
        this.message = err;
      })
  }

  fetchDataHist(args: any) {
    this.ptsApiService.getDataHis(this.conditionHist).then(
      (data: any) => {
        this.isPopupVisible = true;
        this.message = data;
      }, err => {
        this.isPopupVisible = true;
        this.message = err;
      })
  }

  fetchDataAppro(args: any) {
    this.ptsApiService.getDataAppro(this.conditionAppro).then(
      (data: any) => {
        this.isPopupVisible = true;
        this.message = data;
      }, err => {
        this.isPopupVisible = true;
        this.message = err;
      })
  }

  fetchDataStatus(args: any) {
    this.ptsApiService.getDataStatus(this.selectedStatus).then(
      (data: any) => {
        this.isPopupVisible = true;
        this.message = data;
      }, err => {
        this.isPopupVisible = true;
        this.message = err;
      })
  }

  fetchDataVali(args: any) {
    this.ptsApiService.getDataVali(this.conditionVal).then(
      (data: any) => {
        this.isPopupVisible = true;
        this.message = data;
      }, err => {
        this.isPopupVisible = true;
        this.message = err;
      })
  }
  pushData(args: any) {
    if (!args.validationGroup.validate().isValid) {
      return;
    }
    this.ptsApiService.saveData(this.keyValue).then((result) => {
      this.isPopupVisible = true;
      this.message = result;
    }, (err) => {
      this.isPopupVisible = true;
      this.message = err;
    });

    args.validationGroup.reset();
  }

  putData(args: any) {
    if (!args.validationGroup.validate().isValid) {
      return;
    }
    this.ptsApiService.putDataKey(this.updateValue, this.putValue).then((result) => {
      this.isPopupVisible = true;
      this.message = result;
    }, (err) => {
      this.isPopupVisible = true;
      this.message = err;
    });

    args.validationGroup.reset();
  }

  deleteData(args: any) {
    if (!args.validationGroup.validate().isValid) {
      return;
    }
    this.ptsApiService.deleteData(this.deleteKeyValue).then(
      (data: any) => {
        this.isPopupVisible = true;
        this.message = data.results;
      }, err => {
        this.isPopupVisible = true;
        this.message = err;
      })
    args.validationGroup.reset();
  }
}
