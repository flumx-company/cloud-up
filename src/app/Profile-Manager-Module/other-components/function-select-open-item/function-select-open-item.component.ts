import {Component, Input, OnInit} from '@angular/core';

import {AccountingSystem, FineFilter, Restriction} from '../../models';
import {ProcessingFunction, SelectOpenItemConfiguration} from '../../models/processing-functions';

@Component({
  selector: 'app-function-select-open-item',
  templateUrl: './function-select-open-item.component.html',
  styleUrls: ['./function-select-open-item.component.scss']
})
export class FunctionSelectOpenItemComponent implements OnInit {
  @Input() processingFunction: ProcessingFunction = new ProcessingFunction();
  @Input() tenant?: number;
  @Input() readOnly = true;
  @Input() accountingSystems: AccountingSystem[] = [];
  @Input() restrictions: Restriction[] = [];
  @Input() filters: FineFilter[] = [];

  constructor() {}

  ngOnInit() {
    if (!this.processingFunction.selectOpenItemConfiguration) {
      this.processingFunction.selectOpenItemConfiguration =
          new SelectOpenItemConfiguration();
    }
  }

  // tslint:disable-next-line:no-any
  onFieldDataChanged(event: any) {
    if (event.dataField === 'useFilter' && event.value) {
      setTimeout(() => {
        const element = document.querySelector('#filterConfigurationGrid');
        if (element) {
          element.scrollIntoView(
              {behavior: 'smooth', block: 'start', inline: 'nearest'});
        }
      }, 300);
    }
  }
}
