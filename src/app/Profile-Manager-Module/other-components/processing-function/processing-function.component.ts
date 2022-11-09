import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DxFormComponent} from 'devextreme-angular';

import {AccountingSystem, FineFilter, Restriction} from '../../models';
import {ProcessingFunction} from '../../models/processing-functions';
import {FunctionType} from '../../models/processing-functions/function-type';
import {FunctionTypeEnum} from '../../models/processing-functions/function-type-enum';

@Component({
  selector: 'app-processing-function',
  templateUrl: './processing-function.component.html',
  styleUrls: ['./processing-function.component.scss']
})
export class ProcessingFunctionComponent implements OnInit {
  @Input() processingFunction: ProcessingFunction = new ProcessingFunction();
  // tslint:disable-next-line:no-any
  @Output() onSaveFunction = new EventEmitter<any>();
  @Output() onHideForm = new EventEmitter<boolean>();
  @Input() viewMode = 'add';
  @Input() tenant?: number;
  @Input() accountingSystems: AccountingSystem[] = [];
  @Input() restrictions: Restriction[] = [];
  @Input() filters: FineFilter[] = [];
  @ViewChild('functionForm') functionForm?: DxFormComponent;

  formReady = false;
  functionTypes = FunctionType.list;
  SELECT_OPEN_ITEMS = FunctionTypeEnum.SELECT_OPEN_ITEMS;
  MATCH_AMOUNT_ALL = FunctionTypeEnum.MATCH_AMOUNT_ALL;
  MATCH_AMOUNT_SUBSETTING = FunctionTypeEnum.MATCH_AMOUNT_SUBSETTING;

  constructor() {}

  ngOnInit() {}

  navBack() {
    this.onHideForm.emit(true);
  }

  // tslint:disable-next-line:no-any
  saveProcessingFunction(event: any) {
    event.preventDefault();
    this.onSaveFunction.emit();
  }

  // tslint:disable-next-line:no-any
  fieldDataChanged(event: any) {
    if (this.functionForm && this.functionForm.instance && this.formReady) {
      this.functionForm.instance.validate();
    }
  }

  // tslint:disable-next-line:no-any
  onContentReady(event: any) {
    this.formReady = true;
  }
}
