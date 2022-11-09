import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {v4 as UUIDv4} from 'uuid';

import {InfoPopupComponent} from '../../../shared/components/info-popup/info-popup.component';
import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {ListObject} from '../../../shared/models/list-object';
import {OpenItemFieldList} from '../../../shared/models/open-item-field-list';
import {FineFilter} from '../../models/fine-filter';
import {MatchField} from '../../models/match-field';
import {MatchFieldList} from '../../models/match-field-list';

@Component({
  selector: 'app-detail-match-fields-area',
  templateUrl: './detail-match-fields-area.component.html',
  styleUrls: ['./detail-match-fields-area.component.css']
})
export class DetailMatchFieldsAreaComponent implements OnInit {
  @Input() currentFilter: FineFilter|undefined;
  @ViewChild(InfoPopupComponent) infoPopup: InfoPopupComponent|undefined;

  matchFieldList = OpenItemFieldList.list;
  customizeColumns = DataGridUtil.customizeColumns;

  constructor() {}

  ngOnInit() {}

  getValue(uuid: string, settingField: string) {
    if (this.currentFilter && this.currentFilter.matchFields &&
        this.currentFilter.matchFields.length > 0) {
      const settingObject =
          this.currentFilter.matchFields.find(setting => setting.uuid === uuid);
      if (!settingObject) {
        return '';
      }

      if (!settingObject[settingField]) {
        if (settingField === 'singleMatchOnly' || settingField === 'selected') {
          settingObject[settingField] = false;
        } else {
          settingObject[settingField] = '';
        }
      }

      return settingObject[settingField];
    }

    return '';
  }

  // tslint:disable-next-line:no-any
  changeValue(uuid: string, event: any, settingField: string) {
    if (this.currentFilter && this.currentFilter.matchFields &&
        this.currentFilter.matchFields.length > 0) {
      const settingObject =
          this.currentFilter.matchFields.find(setting => setting.uuid === uuid);
      if (!settingObject) {
        return;
      }

      settingObject[settingField] = event.value;
    }
  }

  getMatchFieldList(): ListObject[] {
    if (this.currentFilter) {
      switch (this.currentFilter.filterType) {
        case 'REMITTANCE_ADVICE':
          return MatchFieldList.remittanceAdviceFields;
        case 'MATCHING':
        case 'EXTRACTION':
          return OpenItemFieldList.list;
        case 'BUSINESSPARTNER':
          return MatchFieldList.businesspartnerFields;
        default:
      }
    }

    return [];
  }

  removeMatchField(uuid: string) {
    if (this.currentFilter && this.currentFilter.matchFields &&
        this.currentFilter.matchFields.length > 0) {
      this.currentFilter.matchFields.splice(
          this.currentFilter.matchFields.findIndex(
              field => field.uuid === uuid),
          1);
    }
  }

  addMatchField() {
    if (this.currentFilter) {
      if (!this.currentFilter.matchFields) {
        this.currentFilter.matchFields = [];
      }
      this.currentFilter.matchFields.push(new MatchField({uuid: UUIDv4()}));
    }
  }

  showInfo(uuid: string) {
    if (this.infoPopup) {
      if (this.currentFilter && this.currentFilter.matchFields) {
        const listObject = this.currentFilter.matchFields.find(
            setting => setting.uuid === uuid);

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
        hint: 'Add match field',
        icon: 'add',
        onClick: this.addMatchField.bind(this)
      }
    });
  }

  getMatchFieldDescription(uuid: string) {
    const matchField = this.currentFilter ?
        this.currentFilter.matchFields.find(field => field.uuid === uuid) :
        null;

    if (!matchField) {
      return;
    }

    const selectedMatchField = this.getMatchFieldList().find(
        field => field.technicalName === matchField.matchField);
    if (selectedMatchField) {
      return selectedMatchField.description;
    }

    return;
  }
}
