import {Location} from '@angular/common';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {isNullOrUndefined} from 'util';

import {InfoPopupComponent} from '../../../shared/components/info-popup/info-popup.component';
import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {MessageToast} from '../../../shared/helpers/message-toast';
import {AmountTypeList} from '../../../shared/models/amount-type-list';
import {ListObject} from '../../../shared/models/list-object';
import {StructuredFormats} from '../../../shared/models/structured-formats';
import {AccountingSystem, EntityId, Origin, OriginGroup, ProcessingProfileSequence} from '../../models';
import {OriginFormatTypes} from '../../models/format-types';
import {OriginFormats} from '../../models/formats';
import {OptimizationSearchModeList} from '../../models/optimization-search-mode-list';
import {OriginCharacteristicsSettings} from '../../models/origin-characteristics-settings';
import {OriginGroupCharacteristicsSettings} from '../../models/origin-group-characteristics-settings';
import {AccountingSystemService, OriginGroupService, OriginService, ProfileSequenceService} from '../../services';

@Component({
  selector: 'app-profile-sequence-usage-info',
  templateUrl: './profile-sequence-usage-info.component.html',
  styleUrls: ['./profile-sequence-usage-info.component.css']
})
export class ProfileSequenceUsageInfoComponent implements OnInit {
  @ViewChild(InfoPopupComponent) infoPopup?: InfoPopupComponent;

  originList: Origin[] = [];
  originGroupList: OriginGroup[] = [];
  currentSequence: ProcessingProfileSequence = new ProcessingProfileSequence();
  customizeColumns = DataGridUtil.customizeColumns;
  allAccountingSystems: AccountingSystem[] = [];
  getAccountingSystemNameById = this.getAccountingSystemName.bind(this);

  constructor(
      private location: Location, private route: ActivatedRoute,
      private sequenceService: ProfileSequenceService,
      private originService: OriginService,
      private originGroupService: OriginGroupService,
      private accountingSystemService: AccountingSystemService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.sequenceService.readSequence(params['name']).subscribe(res => {
        this.currentSequence = res[0];

        this.readOriginsForSequence();
        this.readOriginGroupsForSequence();
        this.readAllAccountingSystems();
      }, error => MessageToast.showError(error.message));
    });
  }

  private readOriginsForSequence() {
    this.originService.readOriginsWithSequence(this.currentSequence.sequenceId)
        .subscribe(
            res => {
              this.originList = res;
            },
            error => {
              if (error.status !== 404) {
                MessageToast.showError(error.message);
              }
              this.originList = [];
            });
  }

  private readOriginGroupsForSequence() {
    this.originGroupService
        .readOriginGroupsWithSequence(this.currentSequence.sequenceId)
        .subscribe(
            res => {
              this.originGroupList = res;
            },
            error => {
              if (error.status !== 404) {
                MessageToast.showError(error.message);
              }
              this.originGroupList = [];
            });
  }

  private readAllAccountingSystems() {
    this.accountingSystemService.readAllAccountingSystems().subscribe(
        res => (this.allAccountingSystems = res), error => {
          if (error.status === 204) {
            this.allAccountingSystems = [];
          } else {
            MessageToast.showError(error.message);
          }
        });
  }

  // tslint:disable-next-line:no-any
  onFileSaving(event: any, inOrigin: boolean) {
    if (inOrigin) {
      event.fileName =
          `usage_info_${this.currentSequence.sequenceId.name}_in_origins`;
    } else {
      event.fileName =
          `usage_info_${this.currentSequence.sequenceId.name}_in_origin_groups`;
    }
  }

  navBack() {
    this.location.back();
  }

  // tslint:disable-next-line:no-any
  editOrigin(id: EntityId, event: any) {
    event.stopImmediatePropagation();

    window.open(
        `${location.protocol}//${location.host}/origin-core-data/origin/edit/${
            id.id}`,
        '_blank');
  }

  // tslint:disable-next-line:no-any
  editOriginGroup(id: EntityId, event: any) {
    event.stopImmediatePropagation();

    window.open(
        `${location.protocol}//${
            location.host}/origin-core-data/originGroup/edit/${id.id}`,
        '_blank');
  }

  // tslint:disable-next-line:no-any
  showInfo(infoObject: any) {
    if (isNullOrUndefined(infoObject)) {
      infoObject = this.currentSequence;
    }
    if (this.infoPopup) {
      this.infoPopup.showInfoForObject(infoObject);
    }
  }

  onFileSavingCharacteristics(
      // tslint:disable-next-line:no-any
      event: any, originOrOriginGroup: Origin|OriginGroup) {
    event.fileName = `characteristics_of_${originOrOriginGroup.id!.id}`;
  }

  onFileSavingCurrencyConfigurations(
      // tslint:disable-next-line:no-any
      event: any, originOrOriginGroup: Origin|OriginGroup) {
    event.fileName = `currencyConfigurations_of_${originOrOriginGroup.id!.id}`;
  }

  onFileSavingImportReasonCodes(
      // tslint:disable-next-line:no-any
      event: any, originOrOriginGroup: Origin|OriginGroup) {
    event.fileName = `importReasonCodes_of_${originOrOriginGroup.id!.id}`;
  }

  onFileSavingOptimizationConfigurations(
      // tslint:disable-next-line:no-any
      event: any, originOrOriginGroup: Origin|OriginGroup) {
    event.fileName =
        `optimizationConfigurations_of_${originOrOriginGroup.id!.id}`;
  }

  // tslint:disable-next-line:no-any
  showOriginInfo(id: EntityId, event: any) {
    event.stopImmediatePropagation();
    this.showInfo(this.originList.find(origin => origin.id.id === id.id));
  }

  // tslint:disable-next-line:no-any
  showOriginGroupInfo(id: EntityId, event: any) {
    event.stopImmediatePropagation();
    this.showInfo(
        this.originGroupList.find(originGroup => originGroup.id.id === id.id));
  }

  // tslint:disable-next-line:no-any
  showProfileSequenceInfo(event: any) {
    event.stopImmediatePropagation();
    this.showInfo(this.currentSequence);
  }


  showInfoCharacteristic(
      // tslint:disable-next-line:no-any
      id: number, event: any, originOrOriginGroup: Origin|OriginGroup) {
    event.stopImmediatePropagation();
    this.showInfo(originOrOriginGroup.characteristics.find(
        characteristic => characteristic.id === id));
  }

  showInfoCurrencyConfiguration(
      // tslint:disable-next-line:no-any
      id: number, event: any, originOrOriginGroup: Origin|OriginGroup) {
    event.stopImmediatePropagation();
    this.showInfo(originOrOriginGroup.foreignCurrencyConfigurations.find(
        c => c.id === id));
  }

  showInfoImportReasonCode(
      // tslint:disable-next-line:no-any
      id: number, event: any, originOrOriginGroup: Origin|OriginGroup) {
    event.stopImmediatePropagation();
    this.showInfo(originOrOriginGroup.importReasonCodes.find(c => c.id === id));
  }

  showInfoOptimizationConfiguration(
      // tslint:disable-next-line:no-any
      id: number, event: any, originOrOriginGroup: Origin|OriginGroup) {
    event.stopImmediatePropagation();
    this.showInfo(
        originOrOriginGroup.optimizationConfigurations.find(c => c.id === id));
  }

  // tslint:disable-next-line:no-any
  getAccountingSystemName(accountingSystemId: any) {
    const system = this.allAccountingSystems.find(
        accountingSystem => accountingSystem.id === accountingSystemId.value);
    return system ? system.name : '';
  }

  // tslint:disable-next-line:no-any
  getAmountTypeDisplayName(e: any): string {
    return ListObject.getDisplayName(e.value, AmountTypeList.list);
  }

  // tslint:disable-next-line:no-any
  getSearchModeDisplayName(e: any): string {
    return ListObject.getDisplayName(e.value, OptimizationSearchModeList.list);
  }

  // tslint:disable-next-line:no-any
  addPercentSign(cellInfo: any) {
    if (isNullOrUndefined(cellInfo.value) || cellInfo.value.length < 1) {
      return '';
    }

    return `${cellInfo.value}%`;
  }

  // tslint:disable-next-line:no-any
  onExporting(e: any) {
    e.component.beginUpdate();
    e.component.columnOption('id', 'visible', false);
  }

  // tslint:disable-next-line:no-any
  onExported(e: any) {
    e.component.columnOption('id', 'visible', true);
    e.component.endUpdate();
  }

  // tslint:disable-next-line:no-any
  getOriginCharacteristicDisplayName(technicalName: any): string {
    return ListObject.getDisplayName(
        technicalName.value, OriginCharacteristicsSettings.list);
  }

  // tslint:disable-next-line:no-any
  getOriginGroupCharacteristicDisplayName(technicalName: any): string {
    return ListObject.getDisplayName(
        technicalName.value, OriginGroupCharacteristicsSettings.list);
  }

  // tslint:disable-next-line:no-any
  getFormatDisplayName(technicalName: any): string {
    return ListObject.getDisplayName(technicalName.value, OriginFormats.list);
  }

  // tslint:disable-next-line:no-any
  getFormatTypeDisplayName(technicalName: any): string {
    return ListObject.getDisplayName(
        technicalName.value, OriginFormatTypes.list);
  }

  isCharacteristicSectionVisible(origin: Origin) {
    return StructuredFormats.list.includes(origin.format!);
  }

  isCurrencyConfigurationSectionVisible(origin: Origin) {
    return origin.format === 'MT940';
  }

  isOptimizationConfigurationSectionVisible(origin: Origin) {
    return !StructuredFormats.list.includes(origin.format!);
  }
}
