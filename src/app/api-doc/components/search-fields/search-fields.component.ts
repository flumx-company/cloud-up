import { Component, OnInit } from '@angular/core';
import { SearchFieldsService } from './../../services/search-fields.service';

@Component({
  selector: 'app-search-fields',
  templateUrl: './search-fields.component.html',
  styleUrls: ['./search-fields.component.scss']
})
export class SearchFieldsComponent implements OnInit {
  accordionFilter = ['Get a list of documents with/without filter'];
  accordionPost = ['Post add new document'];
  accordionPut = ['PUT update search field document'];
  accordionDelete = ['DELETE search field'];
  isPopupVisible: any;
  message: any;
  keyValue: any;
  updateValue: any;

  constructor(public searchFieldsService: SearchFieldsService) { }

  ngOnInit() {
  }

  fetchData(args: any) {
    this.searchFieldsService.getData().then(
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
    this.searchFieldsService.saveData(this.keyValue).then((result) => {
      this.isPopupVisible = true;
      this.message = result;
    }, (err) => {
      this.isPopupVisible = true;
      this.message = err.MESSAGE;
    });

    args.validationGroup.reset();
  }

  putData(args: any) {
    if (!args.validationGroup.validate().isValid) {
      return;
    }
    this.searchFieldsService.putDataKey(this.updateValue).then((result) => {
      this.isPopupVisible = true;
      this.message = result;
    }, (err) => {
      this.isPopupVisible = true;
      this.message = err;
    });

    args.validationGroup.reset();
  }

  deleteData() {

    this.searchFieldsService.deleteData().then(
      (data: any) => {
        this.isPopupVisible = true;
        this.message = data.results;
      },err=>{
        this.isPopupVisible = true;
        this.message = err;
      })
  }
}
