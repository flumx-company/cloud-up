import { Component, OnInit } from '@angular/core';
import { FieldConfigsService } from './../../services/field-configs.service';

@Component({
  selector: 'app-field-configs',
  templateUrl: './field-configs.component.html',
  styleUrls: ['./field-configs.component.scss']
})
export class FieldConfigsComponent implements OnInit {
  accordionFilter = ['Get a list of documents with/without filter'];
  accordionPost = ['Post add new document'];
  accordionPut = ['PUT update field config document'];
  accordionDelete = ['DELETE field config'];
  isPopupVisible: any;
  message: any;
  keyValue: any;
  updateValue: any;

  constructor(public fieldConfigsService: FieldConfigsService) { }

  ngOnInit() {
  }

  fetchData(args: any) {
    this.fieldConfigsService.getData().then(
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
   this.fieldConfigsService.saveData(this.keyValue).then((result) => {
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
   this.fieldConfigsService.putDataKey(this.updateValue).then((result) => {
     this.isPopupVisible = true;
     this.message = result;
   }, (err) => {
     this.isPopupVisible = true;
     this.message = err.MESSAGE;
   });

   args.validationGroup.reset();
 }

 deleteData() {

   this.fieldConfigsService.deleteData().then(
     (data: any) => {
       this.isPopupVisible = true;
       this.message = data.results;
     },err=>{
       this.isPopupVisible = true;
       this.message = err;
     })
 }
}
