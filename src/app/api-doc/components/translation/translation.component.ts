import { Component, OnInit } from '@angular/core';
import { TranslationService } from './../../services/translation.service';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent implements OnInit {
  accordionFilter = ['Get a bunch of tranlstion docs by filter'];
  accordionPost = ['Post add new document'];
  accordionPut = ['PUT update  translation document'];
  accordionDelete = ['DELETE  translation document'];
  isPopupVisible: any;
  message: any;
  keyValue: any;
  updateValue: any;
  constructor(public translationService: TranslationService) { }

  ngOnInit() {
  }

  fetchData(args: any) {
     this.translationService.getData().then(
      (data: any) => {
        this.isPopupVisible = true;
        this.message = data;
      },err=>{
        this.isPopupVisible = true;
        this.message = err;
      })
  }

  pushData(args: any) {
    if (!args.validationGroup.validate().isValid) {
      return;
    }
    this.translationService.saveData(this.keyValue).then((result) => {
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
    this.translationService.putDataKey(this.updateValue).then((result) => {
      this.isPopupVisible = true;
      this.message = result;
    }, (err) => {
      this.isPopupVisible = true;
      this.message = err.MESSAGE;
    });

    args.validationGroup.reset();
  }

  deleteData() {

    this.translationService.deleteData().then(
      (data: any) => {
        this.isPopupVisible = true;
        this.message = data.results;
      },err=>{
        this.isPopupVisible = true;
        this.message = err;
      })
  }
}
