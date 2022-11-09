import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {isNullOrUndefined} from 'util';

import {InfoPopupComponent} from '../../../shared/components/info-popup/info-popup.component';
import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {ListObject} from '../../../shared/models/list-object';
import {FineFilter} from '../../models/fine-filter';
import {ValidationFunctionConfiguration} from '../../models/validation-function-configuration';
import {ValidationTypeList} from '../../models/validation-type-list';

@Component({
  selector: 'app-detail-validation-area',
  templateUrl: './detail-validation-area.component.html',
  styleUrls: ['./detail-validation-area.component.css']
})
export class DetailValidationAreaComponent implements OnInit {
  @Input() currentFilter: FineFilter|undefined;
  @ViewChild(InfoPopupComponent) infoPopup: InfoPopupComponent|undefined;

  validationTypeList: ListObject[] = ValidationTypeList.list;
  customizeColumns = DataGridUtil.customizeColumns;
  validationFunctionList = [new ListObject(
      {displayName: 'Conversion Table', technicalName: 'conversionTable'})];

  constructor() {}

  ngOnInit() {}

  // tslint:disable-next-line:no-any
  changeLimitValue(event: any, limitField: string) {
    if (this.currentFilter) {
      this.currentFilter[limitField] = event.value;
    }
  }

  switchValidationFunctions(functionIndex1: number, functionIndex2: number) {
    if (this.currentFilter) {
      const firstFunction =
          this.currentFilter.validationFunctionConfigurations[functionIndex1];
      const secondFunction =
          this.currentFilter.validationFunctionConfigurations[functionIndex2];
      firstFunction.index = functionIndex2;
      secondFunction.index = functionIndex1;
      this.currentFilter.validationFunctionConfigurations.splice(
          firstFunction.index, 1, firstFunction);
      this.currentFilter.validationFunctionConfigurations.splice(
          secondFunction.index, 1, secondFunction);
    }
  }

  moveToStart(index: number) {
    if (this.currentFilter) {
      const func =
          this.currentFilter.validationFunctionConfigurations.splice(index, 1);
      this.currentFilter.validationFunctionConfigurations.unshift(...func);
      this.currentFilter.validationFunctionConfigurations.forEach(
          (func, index) => {
            func.index = index;
          });
    }
  }

  moveToEnd(index: number) {
    if (this.currentFilter) {
      const func =
          this.currentFilter.validationFunctionConfigurations.splice(index, 1);
      this.currentFilter.validationFunctionConfigurations.push(...func);
      this.currentFilter.validationFunctionConfigurations.forEach(
          (func, index) => {
            func.index = index;
          });
    }
  }

  moveOneUp(index: number) {
    if (index > 0) {
      this.switchValidationFunctions(index, index - 1);
    }
  }

  moveOneDown(index: number) {
    if (this.currentFilter) {
      if (index <
          this.currentFilter.validationFunctionConfigurations.length - 1) {
        this.switchValidationFunctions(index, index + 1);
      }
    }
  }

  removeValidationFunction(index: number) {
    if (this.currentFilter) {
      this.currentFilter.validationFunctionConfigurations.splice(index, 1);
      this.currentFilter.validationFunctionConfigurations
          .slice(
              index, this.currentFilter.validationFunctionConfigurations.length)
          .forEach(config => {
            if (config.index) {
              config.index--;
            }
          });
    }
  }

  addValidateFunction() {
    if (this.currentFilter) {
      if (!this.currentFilter.validationFunctionConfigurations) {
        this.currentFilter.validationFunctionConfigurations = [];
      }
      this.currentFilter.validationFunctionConfigurations.push(
          new ValidationFunctionConfiguration({
            index: this.currentFilter.validationFunctionConfigurations.length
          }));
    }
  }

  getValue(index: number, settingField: string) {
    if (this.currentFilter) {
      const settingObject =
          this.currentFilter.validationFunctionConfigurations.find(
              setting => setting.index === index);
      if (!settingObject) {
        return '';
      }

      if (!settingObject[settingField]) {
        settingObject[settingField] = '';
      }

      return settingObject[settingField];
    }

    return '';
  }

  // tslint:disable-next-line:no-any
  changeValue(index: number, event: any, settingField: string) {
    if (this.currentFilter) {
      const settingObject =
          this.currentFilter.validationFunctionConfigurations.find(
              setting => setting.index === index);
      if (!settingObject) {
        return;
      }

      settingObject[settingField] = event.value;
    }
  }

  showInfo(index: number) {
    if (this.infoPopup) {
      if (this.currentFilter) {
        const listObject =
            this.currentFilter.validationFunctionConfigurations.find(
                setting => setting.index === index);

        if (listObject) {
          this.infoPopup.showInfoForObject(listObject);
        }
      }
    }
  }

  // tslint:disable-next-line:no-any
  onToolbarPreparing(event: any) {
    event.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        hint: 'Add validation function',
        icon: 'add',
        onClick: this.addValidateFunction.bind(this)
      }
    });
  }

  // tslint:disable-next-line:no-any
  customizeIndex(index: any): string {
    return '' + (Number(index.value) + 1);
  }
}
