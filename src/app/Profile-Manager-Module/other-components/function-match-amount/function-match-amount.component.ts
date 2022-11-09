import {Component, Input, OnInit} from '@angular/core';
import {isNullOrUndefined} from 'util';

import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {MessageToast} from '../../../shared/helpers/message-toast';
import {OpenItemFieldList} from '../../../shared/models/open-item-field-list';
import {ToleranceGroup} from '../../models';
import {AccountingMode, BillingMode, MatchAmountConfiguration, MatchAmountSubSettingConfiguration, Period, ProcessingFunction, SortOrder, SubSettingConfiguration} from '../../models/processing-functions';
import {FunctionTypeEnum} from '../../models/processing-functions/function-type-enum';
import {ToleranceGroupService} from '../../services';

@Component({
  selector: 'app-function-match-amount',
  templateUrl: './function-match-amount.component.html',
  styleUrls: ['./function-match-amount.component.scss']
})
export class FunctionMatchAmountComponent implements OnInit {
  @Input() processingFunction: ProcessingFunction = new ProcessingFunction();
  @Input() readOnly = true;
  toleranceGroups: ToleranceGroup[] = [];
  accountingModes = AccountingMode.list;
  billingModes = BillingMode.list;
  sortModes = SortOrder.list;
  onCellPrepared = DataGridUtil.onCellPrepared;
  customizeColumns = DataGridUtil.customizeColumns;
  periods = Period.list;
  openItemFields = OpenItemFieldList.list;
  FunctionTypeEnum = FunctionTypeEnum;
  startDatePattern = new RegExp('[0-9]{2}-[0-9]{2}');

  constructor(private toleranceGroupService: ToleranceGroupService) {}

  ngOnInit() {
    if (!this.processingFunction.matchAmountConfiguration) {
      this.processingFunction.matchAmountConfiguration =
          new MatchAmountConfiguration();
    }
    if (!this.processingFunction.matchAmountSubSettingConfiguration) {
      this.processingFunction.matchAmountSubSettingConfiguration =
          new MatchAmountSubSettingConfiguration(
              {subSettingConfigurations: []});
    }
    this.loadToleranceGroups();
  }

  loadToleranceGroups() {
    this.toleranceGroupService.readAll().subscribe(res => {
      this.toleranceGroups = res;
    });
  }

  // tslint:disable-next-line:no-any
  onInitNewRow(event: any) {
    if (this.processingFunction.matchAmountSubSettingConfiguration!
            .subSettingConfigurations.length > 0) {
      event.data.index =
      this.processingFunction.matchAmountSubSettingConfiguration!.subSettingConfigurations[this.processingFunction.matchAmountSubSettingConfiguration!.subSettingConfigurations.length - 1]
              .index +
          10;
    } else {
      event.data.index = 10;
    }
  }

  // tslint:disable-next-line:no-any
  onEditorPreparing(event: any) {
    if (event.parentType === 'dataRow' && event.dataField === 'startDate' ||
        event.dataField === 'period') {
      if (event.row) {
        event.editorOptions.disabled =
            isNullOrUndefined(OpenItemFieldList.list.find(
                openItemField => openItemField.isDateField === true &&
                    openItemField.technicalName ===
                        event.row.data.openItemField));
      } else {
        event.editorOptions.disabled = true;
      }
    }
  }

  // tslint:disable-next-line:no-any
  setOpenItemField(rowData: any, value: any) {
    rowData.startDate = null;
    rowData.period = null;
    // tslint:disable-next-line:no-any
    (this as any).defaultSetCellValue(rowData, value);
  }

  // tslint:disable-next-line:no-any
  rowValidating(event: any) {
    if (event && event.brokenRules && event.brokenRules.length > 0) {
      event.errorText = event.brokenRules[0].message;
    }

    if (event.newData.period && !event.newData.startDate) {
      event.errorText = 'Start Date is required when Period is set';
      event.isValid = false;
    }
  }

  // tslint:disable-next-line:no-any
  onRowInserting(event: any) {
    if (this.processingFunction.matchAmountSubSettingConfiguration!
            .subSettingConfigurations.find(
                config => this.isDuplicate(config, event.data))) {
      MessageToast.showError('Entry already exists!');
      event.cancel = true;
    }
  }

  // tslint:disable-next-line:no-any
  onRowUpdating(event: any) {
    if (this.processingFunction.matchAmountSubSettingConfiguration!
            .subSettingConfigurations.find(
                config => this.isDuplicate(config, event.newData))) {
      MessageToast.showError('Entry already exists!');
      event.cancel = true;
    }
  }

  private isDuplicate(
      config1: SubSettingConfiguration,
      config2: SubSettingConfiguration): boolean {
    return config1.index === config2.index &&
        config1.openItemField === config2.openItemField &&
        config1.period === config2.period &&
        config1.startDate === config2.startDate;
  }
}
