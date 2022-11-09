import {Component, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {DxLookupComponent} from 'devextreme-angular';

import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {MessageToast} from '../../../shared/helpers/message-toast';
import {ListObject} from '../../../shared/models/list-object';
import {AccountingSystem, FineFilter, FineFilterTypeList, Restriction} from '../../models';
import {RemoteConfiguration} from '../../models/processing-functions';

@Component({
  selector: 'app-remote-configuration',
  templateUrl: './remote-configuration.component.html',
  styleUrls: ['./remote-configuration.component.scss']
})
export class RemoteConfigurationComponent implements OnInit {
  // tslint:disable-next-line:no-any
  @ViewChildren('filterLookup') filterLookupList?: QueryList<DxLookupComponent>;
  @Input()
  columns: string[] =
      ['accountingSystemId', 'filterType', 'filterName', 'restrictionName'];

  @Input() @Output() remoteConfigurations: RemoteConfiguration[] = [];
  @Input() tenant?: number;
  @Input() readOnly = true;

  @Input() accountingSystems: AccountingSystem[] = [];
  @Input() restrictions: Restriction[] = [];
  @Input() filters: FineFilter[] = [];
  filterTypes = FineFilterTypeList.list;
  customizeColumns = DataGridUtil.customizeColumns;
  onCellPrepared = DataGridUtil.onCellPrepared;
  getFilters = this.getFilterList.bind(this);
  // tslint:disable-next-line:no-any
  filterSelectBox: any;

  constructor() {}

  ngOnInit() {}

  // tslint:disable-next-line:no-any
  getFilterTypeDisplayName(technicalName: any): string {
    return ListObject.getDisplayName(
        technicalName.value, FineFilterTypeList.list);
  }

  isVisible(column: string): boolean {
    if (this.columns.includes(column)) {
      return true;
    }

    return false;
  }

  // tslint:disable-next-line:no-any
  onInitNewRow(event: any) {
    event.data.tenant = this.tenant;
  }

  // tslint:disable-next-line:no-any
  setFilterType(rowData: any, value: any) {
    rowData.filterName = null;
    // tslint:disable-next-line:no-any
    (this as any).defaultSetCellValue(rowData, value);
  }

  // tslint:disable-next-line:no-any
  getFilterList(options: any) {
    return {
      store: this.filters,
      filter: options.data ? ['filterType', '=', options.data.filterType] : null
    };
  }

  // tslint:disable-next-line:no-any
  onEditorPreparing(event: any) {
    if (event.parentType !== 'filterRow') {
      return;
    }

    if (event.dataField === 'filterType') {
      // tslint:disable-next-line:no-any
      event.editorOptions.onValueChanged = (e: any) => {
        if (this.filterLookupList) {
          this.filterSelectBox.setValue(null);
          if (e.value) {
            this.filterLookupList.first.dataSource =
                this.filters.filter(filter => filter.filterType === e.value);
          } else {
            this.filterLookupList.first.dataSource = this.filters;
          }
        }
        event.setValue(e.value);
      };
    }

    if (event.dataField === 'filterName') {
      this.filterSelectBox = event;
    }
  }

  // tslint:disable-next-line:no-any
  onRowInserting(event: any) {
    if (this.remoteConfigurations.find(
            config => this.isDuplicate(config, event.data))) {
      MessageToast.showError('Entry already exists!');
      event.cancel = true;
    }
  }

  // tslint:disable-next-line:no-any
  onRowUpdating(event: any) {
    if (this.remoteConfigurations.find(
            config => this.isDuplicate(config, event.newData))) {
      MessageToast.showError('Entry already exists!');
      event.cancel = true;
    }
  }

  private isDuplicate(
      config1: RemoteConfiguration, config2: RemoteConfiguration): boolean {
    let duplicate = 0;

    this.columns.forEach(column => {
      if (config1[column] === config2[column]) {
        duplicate++;
      }
    });

    return duplicate === this.columns.length;
  }
}
