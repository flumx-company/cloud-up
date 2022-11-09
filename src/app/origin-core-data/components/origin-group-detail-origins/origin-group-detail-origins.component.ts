import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DxDataGridComponent} from 'devextreme-angular';
import {isNullOrUndefined} from 'util';

import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {StructuredFormats} from '../../../shared/models/structured-formats';
import {InsertMetaData} from '../../models/insert-meta-data';
import {Origin} from '../../models/origin';
import {OriginCharacteristicsSettings} from '../../models/origin-characteristics-settings';
import {UpdateMetaData} from '../../models/update-meta-data';

@Component({
  selector: 'app-origin-group-detail-origins',
  templateUrl: './origin-group-detail-origins.component.html',
  styleUrls: ['./origin-group-detail-origins.component.css']
})
export class OriginGroupDetailOriginsComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent|undefined;
  @Input() filteredOrigins: Origin[] = [];
  @Input() selectedRowKeys: Origin[] = [];
  @Output() change = new EventEmitter();

  infoVisible = false;
  // tslint:disable-next-line:no-any
  infoObject: any;
  originPath = '/origin-core-data/origin';
  structuredFormats = StructuredFormats.list;
  customizeColumns = DataGridUtil.customizeColumns;

  constructor() {
    this.infoObject = new Origin({
      insertMetadata: new InsertMetaData(),
      updateMetadata: new UpdateMetaData()
    });
  }

  ngOnInit() {}

  // tslint:disable-next-line:no-any
  getOriginCharacteristicDisplayName(technicalName: any) {
    if (isNullOrUndefined(technicalName.value)) {
      return 'n/a';
    }

    const originCharacteristicObj = OriginCharacteristicsSettings.list.find(
        originCharacteristic =>
            originCharacteristic.technicalName === technicalName.value);
    if (!originCharacteristicObj) {
      return 'n/a';
    }

    return originCharacteristicObj.displayName;
  }

  // tslint:disable-next-line:no-any
  editOrigin(originId: string, event: any) {
    event.stopImmediatePropagation();

    window.open(
        `${location.protocol}//${location.host}${this.originPath}/edit/${
            originId}`,
        '_blank');
  }

  // tslint:disable-next-line:no-any
  showInfo(id: string, event: any) {
    event.stopImmediatePropagation();

    this.infoObject = this.filteredOrigins.find(origin => origin.id!.id === id);

    if (isNullOrUndefined(this.infoObject.insertMetadata)) {
      this.infoObject.insertMetadata = new InsertMetaData();
    }

    if (isNullOrUndefined(this.infoObject.updateMetadata)) {
      this.infoObject.updateMetadata = new UpdateMetaData();
    }

    this.infoVisible = true;
  }

  // tslint:disable-next-line:no-any
  emitChanges(e: any) {
    this.change.emit(this.selectedRowKeys);
    e.component.refresh();
  }

  // tslint:disable-next-line:no-any
  getFormatTypeDisplayName(format: any) {
    if (isNullOrUndefined(format)) {
      return 'n/a';
    }

    return this.structuredFormats.includes(format) ? 'Structured' :
                                                     'Unstructured';
  }
}
