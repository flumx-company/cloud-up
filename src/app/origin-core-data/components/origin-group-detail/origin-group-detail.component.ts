import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {confirm} from 'devextreme/ui/dialog';
import {isNullOrUndefined} from 'util';

import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {DirtyCheck} from '../../../shared/helpers/dirty-check';
import {MessageToast} from '../../../shared/helpers/message-toast';
import {AmountTypeList} from '../../../shared/models/amount-type-list';
import {Bai2lockboxRelevantFieldList} from '../../../shared/models/bai2lockbox-relevant-field-list';
import {BpiRelevantFieldList} from '../../../shared/models/bpi-relevant-field-list';
import {PaypalRelevantFieldList} from '../../../shared/models/paypal-relevant-field-list';
import {AuthService} from '../../../shared/services/auth.service';
import {AccountingSystem} from '../../models/accounting-system';
import {Characteristic} from '../../models/characteristic';
import {CurrencyConfiguration} from '../../models/currency-configuration';
import {EntityId} from '../../models/entity-id';
import {ImportReasonCode} from '../../models/import-reason-code';
import {InsertMetaData} from '../../models/insert-meta-data';
import {MatchFieldsOI} from '../../models/match-fields-oi';
import {OptimizationConfiguration} from '../../models/optimization-configuration';
import {OptimizationSearchModeList} from '../../models/optimization-search-mode-list';
import {Origin} from '../../models/origin';
import {OriginGroup} from '../../models/origin-group';
import {OriginGroupCharacteristicsSettings} from '../../models/origin-group-characteristics-settings';
import {ProcessingProfileSequence} from '../../models/processing-profile-sequence';
import {UpdateMetaData} from '../../models/update-meta-data';
import {AccountingSystemService} from '../../services/accounting-system.service';
import {OriginGroupService} from '../../services/origin-group.service';
import {OriginService} from '../../services/origin.service';
import {ProfileSequenceService} from '../../services/profile-sequence.service';

@Component({
  selector: 'app-origin-group-detail',
  templateUrl: './origin-group-detail.component.html',
  styleUrls: ['./origin-group-detail.component.css']
})
export class OriginGroupDetailComponent implements OnInit {
  originGroupPath = 'origin-core-data';

  mode = '';
  modeCharacteristic = '';
  modeCurrencyConfiguration = '';
  modeImportReasonCode = '';
  modeOptimizationConfiguration = '';

  isCharacteristicFormHidden = true;
  isCurrencyConfigurationFormHidden = true;
  isImportReasonCodeFormHidden = true;
  isOptimizationConfigurationFormHidden = true;

  allAccountingSystems: AccountingSystem[] = [];
  allProfileSequences: ProcessingProfileSequence[] = [];
  allOrigins: Origin[] = [];
  allOriginGroupIds: string[] = [];
  allOpenItemFields = MatchFieldsOI.list;
  readonly sourceFieldRelevantFields =
      BpiRelevantFieldList.list.concat(PaypalRelevantFieldList.list)
          .concat(Bai2lockboxRelevantFieldList.list);
  amountTypes = AmountTypeList.list;
  amountTypesForReasonCodes = AmountTypeList.availableForReasonCodesList;
  optimizationSearchModes = OptimizationSearchModeList.list;

  characteristicSettings = OriginGroupCharacteristicsSettings.list;

  infoVisible = false;
  // tslint:disable-next-line:no-any
  infoObject: any;

  customizeColumns = DataGridUtil.customizeColumns;

  backupOriginGroupString = '';
  currentOriginGroup: OriginGroup;
  currentCharacteristic: Characteristic;
  currentCurrencyConfiguration: CurrencyConfiguration;
  currentImportReasonCode: ImportReasonCode;
  currentOptimizationConfiguration: OptimizationConfiguration;

  name: string|undefined|null;
  tenant?: number;

  filteredOrigins: Origin[] = [];
  selectedRows: string[] = [];

  constructor(
      private route: ActivatedRoute, private router: Router,
      private originGroupService: OriginGroupService,
      private originService: OriginService,
      private accountingSystemService: AccountingSystemService,
      private profileSequenceService: ProfileSequenceService,
      private authService: AuthService) {
    try {
      this.tenant = this.authService.getTenant();
    } catch (error) {
      console.log(error);
    }
    this.currentOriginGroup =
        new OriginGroup({id: new EntityId({tenant: this.tenant})});
    this.currentCharacteristic = new Characteristic();
    this.currentCurrencyConfiguration = new CurrencyConfiguration();
    this.currentImportReasonCode = new ImportReasonCode();
    this.currentOptimizationConfiguration = new OptimizationConfiguration();
    this.infoObject = new Origin({
      insertMetadata: new InsertMetaData(),
      updateMetadata: new UpdateMetaData()
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (isNullOrUndefined(params['name'])) {
        this.mode = 'Add';
        this.currentOriginGroup =
            new OriginGroup({id: new EntityId({tenant: this.tenant})});
      } else {
        this.mode = 'Edit';
        this.name = params['name'];
        this.loadCurrentOriginGroup();
      }
    });

    if (isNullOrUndefined(this.allAccountingSystems) ||
        this.allAccountingSystems.length < 1) {
      this.readAllAccountingSystems();
    }

    if (isNullOrUndefined(this.allProfileSequences) ||
        this.allProfileSequences.length < 1) {
      this.readAllProfileSequences();
    }

    if (isNullOrUndefined(this.allOrigins) || this.allOrigins.length < 1) {
      this.readAllOrigins();
    }

    if (isNullOrUndefined(this.allOriginGroupIds) ||
        this.allOriginGroupIds.length < 1) {
      this.readAllOriginGroupIds();
    }
  }

  loadCurrentOriginGroup() {
    this.originGroupService
        .readOriginGroup(new EntityId({id: this.name!, tenant: this.tenant}))
        .subscribe(res => {
          this.currentOriginGroup = res;
          this.backupOriginGroupString = JSON.stringify(
              res, (key, value) => isNullOrUndefined(value) ? '' : value);
        }, error => MessageToast.showError(error.message));
  }

  readAllAccountingSystems() {
    this.accountingSystemService.readAllAccountingSystems().subscribe(
        res => (this.allAccountingSystems = res), error => {
          if (error.status === 204) {
            this.allAccountingSystems = [];
          } else {
            MessageToast.showError(error.message);
          }
        });
  }

  readAllProfileSequences() {
    this.profileSequenceService.readAllSequences().subscribe(
        res => (this.allProfileSequences = res), error => {
          if (error.status === 404) {
            this.allProfileSequences = [];
          } else {
            MessageToast.showError(error.message);
          }
        });
  }

  readAllOrigins() {
    this.originService.readAllOrigins().subscribe(
        res => {
          this.allOrigins = res;
          this.filterOrigins();
        },
        error => {
          if (error.status === 404) {
            this.allOrigins = [];
          } else {
            MessageToast.showError(error.message);
          }
        });
  }

  readAllOriginGroupIds() {
    this.originGroupService.readAllOriginGroups().subscribe(
        res => {
          this.allOriginGroupIds = res.map<string>(o => {
            if (o.id) {
              return o.id.id!;
            }
            return '';
          });
        },
        error => {
          if (error.status === 404) {
            this.allOriginGroupIds = [];
          } else {
            MessageToast.showError(error.message);
          }
        });
  }

  filterOrigins() {
    this.filteredOrigins = this.allOrigins.filter(
        origin => !origin.originGroupId || origin.originGroupId.length < 1 ||
            origin.originGroupId === this.name);

    this.selectedRows =
        this.filteredOrigins
            .filter(origin => origin.originGroupId === this.name)
            .map<string>(o => {
              if (o.id) {
                return o.id.id!;
              }
              return '';
            });
  }

  addCharacteristic() {
    this.currentCharacteristic = new Characteristic({tenant: this.tenant});
    this.modeCharacteristic = 'Add';
    this.isCharacteristicFormHidden = false;
    this.showCharacteristicForm();
  }

  // tslint:disable-next-line:no-any
  editCharacteristic(characteristicId: number, event: any) {
    event.stopImmediatePropagation();

    this.currentCharacteristic =
        JSON.parse(JSON.stringify(this.currentOriginGroup.characteristics.find(
            characteristic => characteristic.id === characteristicId)));
    this.modeCharacteristic = 'Edit';
    this.isCharacteristicFormHidden = false;
    this.showCharacteristicForm();
  }

  // tslint:disable-next-line:no-any
  removeCharacteristic(characteristicId: number, event: any) {
    event.stopImmediatePropagation();

    const confirmResult = confirm('Are you sure you want to delete this characteristic?', 'Delete');
    confirmResult.then(res => {

      this.currentOriginGroup.characteristics.splice(
        this.currentOriginGroup.characteristics.findIndex(characteristic => characteristic.id === characteristicId),
        1);
    });
  }

  showCharacteristicForm() {
    this.showForm('#characteristicForm');
  }

  hideCharacteristicForm() {
    this.isCharacteristicFormHidden = true;
    window.location.hash = '';
  }

  // tslint:disable-next-line:no-any
  onToolbarPreparingCharacteristicsGrid(e: any) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        hint: 'Add new Characteristic',
        icon: 'add',
        onClick: this.addCharacteristic.bind(this)
      }
    });
  }

  // tslint:disable-next-line:no-any
  onFileSavingCharacteristics(event: any) {
    event.fileName = `characteristics_of_${this.currentOriginGroup.id!.id}`;
  }

  addCurrencyConfiguration() {
    const paymentAmountType =
        this.amountTypes.find!(t => t.technicalName === 'PAYMENTAMOUNT');
    this.currentCurrencyConfiguration = new CurrencyConfiguration({
      tenant: this.tenant,
      originGroupId: this.currentOriginGroup.id!.id,
      amountType: (paymentAmountType) ? paymentAmountType.technicalName : '',
      regexPrefix: '',
      regexCurrency: '',
      regexExchangeRate: ''
    });

    this.modeCurrencyConfiguration = 'Add';
    this.isCurrencyConfigurationFormHidden = false;
    this.showCurrencyConfigurationForm();
  }

  // tslint:disable-next-line:no-any
  editCurrencyConfiguration(currencyConfigurationId: number, event: any) {
    event.stopImmediatePropagation();

    this.currentCurrencyConfiguration = JSON.parse(JSON.stringify(
        this.currentOriginGroup.foreignCurrencyConfigurations.find(
            currencyConfiguration =>
                currencyConfiguration.id === currencyConfigurationId)));
    this.modeCurrencyConfiguration = 'Edit';
    this.isCurrencyConfigurationFormHidden = false;
    this.showCurrencyConfigurationForm();
  }

  // tslint:disable-next-line:no-any
  removeCurrencyConfiguration(id: number, event: any) {
    event.stopImmediatePropagation();

    const confirmResult = confirm('Are you sure you want to delete this foreign Currency-Module configuration?', 'Delete');
    confirmResult.then(res => {

      this.currentOriginGroup.foreignCurrencyConfigurations.splice(
        this.currentOriginGroup.foreignCurrencyConfigurations.findIndex(currencyConfiguration => currencyConfiguration.id === id),
        1);
    });
  }

  // tslint:disable-next-line:no-any
  saveCurrencyConfiguration(e: any) {
    if (!e.validationGroup.validate().isValid) {
      return;
    }

    if (this.modeCurrencyConfiguration === 'Add') {
      if (isNullOrUndefined(
              this.currentOriginGroup.foreignCurrencyConfigurations)) {
        this.currentOriginGroup.foreignCurrencyConfigurations = [];
      }
      this.currentOriginGroup.foreignCurrencyConfigurations.push(
          JSON.parse(JSON.stringify(this.currentCurrencyConfiguration)));
    } else {
      this.currentOriginGroup.foreignCurrencyConfigurations.splice(
          this.currentOriginGroup.foreignCurrencyConfigurations.findIndex(
              currencyConfiguration => currencyConfiguration.id ===
                  this.currentCurrencyConfiguration.id),
          1, JSON.parse(JSON.stringify(this.currentCurrencyConfiguration)));
    }

    this.hideCurrencyConfigurationForm();
  }

  showCurrencyConfigurationForm() {
    this.showForm('#currencyConfigurationForm');
  }

  hideCurrencyConfigurationForm() {
    this.isCurrencyConfigurationFormHidden = true;
    window.location.hash = '';
  }

  // tslint:disable-next-line:no-any
  onToolbarPreparingCurrencyConfigurationsGrid(e: any) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        hint: 'Add new Foreign Currency Information Configuration',
        icon: 'add',
        onClick: this.addCurrencyConfiguration.bind(this)
      }
    });
  }

  // tslint:disable-next-line:no-any
  onFileSavingCurrencyConfigurations(event: any) {
    event.fileName =
        `currencyConfigurations_of_${this.currentOriginGroup.id!.id}`;
  }

  addImportReasonCode() {
    this.currentImportReasonCode = new ImportReasonCode(
        {tenant: this.tenant, originGroupId: this.currentOriginGroup.id!.id});

    this.modeImportReasonCode = 'Add';
    this.isImportReasonCodeFormHidden = false;
    this.showImportReasonCodeForm();
  }

  // tslint:disable-next-line:no-any
  editImportReasonCode(id: number, event: any) {
    event.stopImmediatePropagation();

    this.currentImportReasonCode = JSON.parse(
        JSON.stringify(this.currentOriginGroup.importReasonCodes.find(
            importReasonCode => importReasonCode.id === id)));
    this.modeImportReasonCode = 'Edit';
    this.isImportReasonCodeFormHidden = false;
    this.showImportReasonCodeForm();
  }

  // tslint:disable-next-line:no-any
  removeImportReasonCode(id: number, event: any) {
    event.stopImmediatePropagation();

    const confirmResult = confirm('Are you sure you want to delete this import reason code?', 'Delete');
    confirmResult.then(res => {

      this.currentOriginGroup.importReasonCodes.splice(
        this.currentOriginGroup.importReasonCodes.findIndex(importReasonCode => importReasonCode.id === id),
        1);
    });
  }

  // tslint:disable-next-line:no-any
  saveImportReasonCode(e: any) {
    if (!e.validationGroup.validate().isValid) {
      return;
    }

    if (this.modeImportReasonCode === 'Add') {
      if (isNullOrUndefined(this.currentOriginGroup.importReasonCodes)) {
        this.currentOriginGroup.importReasonCodes = [];
      }
      this.currentOriginGroup.importReasonCodes.push(
          JSON.parse(JSON.stringify(this.currentImportReasonCode)));
    } else {
      this.currentOriginGroup.importReasonCodes.splice(
          this.currentOriginGroup.importReasonCodes.findIndex(
              importReasonCode =>
                  importReasonCode.id === this.currentImportReasonCode.id),
          1, JSON.parse(JSON.stringify(this.currentImportReasonCode)));
    }

    this.hideImportReasonCodeForm();
  }

  showImportReasonCodeForm() {
    this.showForm('#importReasonCodeForm');
  }

  hideImportReasonCodeForm() {
    this.isImportReasonCodeFormHidden = true;
    window.location.hash = '';
  }

  // tslint:disable-next-line:no-any
  onToolbarPreparingImportReasonCodesGrid(e: any) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        hint: 'Add new Import Reason Code',
        icon: 'add',
        onClick: this.addImportReasonCode.bind(this)
      }
    });
  }

  // tslint:disable-next-line:no-any
  onFileSavingImportReasonCodes(event: any) {
    event.fileName = `importReasonCodes_of_${this.currentOriginGroup.id!.id}`;
  }

  addOptimizationConfiguration() {
    this.currentOptimizationConfiguration = new OptimizationConfiguration({
      tenant: this.tenant,
      originGroupId: this.currentOriginGroup.id!.id,
      accountingSystem: 0
    });

    this.modeOptimizationConfiguration = 'Add';
    this.isOptimizationConfigurationFormHidden = false;
    this.showOptimizationConfigurationForm();
  }

  // tslint:disable-next-line:no-any
  editOptimizationConfiguration(id: number, event: any) {
    event.stopImmediatePropagation();

    this.currentOptimizationConfiguration = JSON.parse(
        JSON.stringify(this.currentOriginGroup.optimizationConfigurations.find(
            optimizationConfiguration => optimizationConfiguration.id === id)));
    this.modeOptimizationConfiguration = 'Edit';
    this.isOptimizationConfigurationFormHidden = false;
    this.showOptimizationConfigurationForm();
  }

  // tslint:disable-next-line:no-any
  removeOptimizationConfiguration(id: number, event: any) {
    event.stopImmediatePropagation();

    const confirmResult = confirm('Are you sure you want to delete this optimization configuration?', 'Delete');
    confirmResult.then(res => {

      this.currentOriginGroup.optimizationConfigurations.splice(
        this.currentOriginGroup.optimizationConfigurations.findIndex(optimizationConfiguration => optimizationConfiguration.id === id),
        1);
    });
  }

  // tslint:disable-next-line:no-any
  saveOptimizationConfiguration(e: any) {
    if (!e.validationGroup.validate().isValid) {
      return;
    }

    if (this.modeOptimizationConfiguration === 'Add') {
      if (isNullOrUndefined(
              this.currentOriginGroup.optimizationConfigurations)) {
        this.currentOriginGroup.optimizationConfigurations = [];
      }
      this.currentOriginGroup.optimizationConfigurations.push(
          JSON.parse(JSON.stringify(this.currentOptimizationConfiguration)));
    } else {
      this.currentOriginGroup.optimizationConfigurations.splice(
          this.currentOriginGroup.optimizationConfigurations.findIndex(
              optimizationConfiguration => optimizationConfiguration.id ===
                  this.currentOptimizationConfiguration.id),
          1, JSON.parse(JSON.stringify(this.currentOptimizationConfiguration)));
    }

    this.hideOptimizationConfigurationForm();
  }

  showOptimizationConfigurationForm() {
    this.showForm('#optimizationConfigurationForm');
  }

  hideOptimizationConfigurationForm() {
    this.isOptimizationConfigurationFormHidden = true;
    window.location.hash = '';
  }

  // tslint:disable-next-line:no-any
  onToolbarPreparingOptimizationConfigurationsGrid(e: any) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        hint: 'Add new Import Reason Code',
        icon: 'add',
        onClick: this.addOptimizationConfiguration.bind(this)
      }
    });
  }

  // tslint:disable-next-line:no-any
  onFileSavingOptimizationConfigurations(event: any) {
    event.fileName =
        `optimizationConfigurations_of_${this.currentOriginGroup.id!.id}`;
  }

  showForm(selector: string) {
    setTimeout(() => {
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView(
            {behavior: 'smooth', block: 'end', inline: 'nearest'});
      }
    }, 100);
  }

  // tslint:disable-next-line:no-any
  showInfo(infoObject: any) {
    this.infoObject = infoObject;

    if (isNullOrUndefined(this.infoObject.insertMetadata)) {
      this.infoObject.insertMetadata = new InsertMetaData();
    }

    if (isNullOrUndefined(this.infoObject.updateMetadata)) {
      this.infoObject.updateMetadata = new UpdateMetaData();
    }

    this.infoVisible = true;
  }

  // tslint:disable-next-line:no-any
  showInfoOriginGroup(event: any) {
    event.stopImmediatePropagation();
    this.showInfo(this.currentOriginGroup);
  }

  // tslint:disable-next-line:no-any
  showInfoCharacteristic(id: number, event: any) {
    event.stopImmediatePropagation();
    this.showInfo(this.currentOriginGroup.characteristics.find(
        characteristic => characteristic.id === id));
  }

  // tslint:disable-next-line:no-any
  showInfoCurrencyConfiguration(id: number, event: any) {
    event.stopImmediatePropagation();
    this.showInfo(this.currentOriginGroup.foreignCurrencyConfigurations.find(
        c => c.id === id));
  }

  // tslint:disable-next-line:no-any
  showInfoImportReasonCode(id: number, event: any) {
    event.stopImmediatePropagation();
    this.showInfo(
        this.currentOriginGroup.importReasonCodes.find(c => c.id === id));
  }

  // tslint:disable-next-line:no-any
  showInfoOptimizationConfiguration(id: number, event: any) {
    event.stopImmediatePropagation();
    this.showInfo(this.currentOriginGroup.optimizationConfigurations.find(
        c => c.id === id));
  }

  navBack() {
    const changedOrigins = this.getChangedOrigins();
    const isDirty =
        DirtyCheck.isDirty(
            this.currentOriginGroup, this.backupOriginGroupString) ||
        Array.isArray(changedOrigins) && changedOrigins.length;

    if (!isDirty) {
      this.router.navigate([this.originGroupPath]);
      return;
    }

    const result = confirm('Continue without saving?', '');
    result.then(res => {
      if (res) {
        this.router.navigate([this.originGroupPath]);
      }
    });
  }

  // tslint:disable-next-line:no-any
  save(e: any) {
    e.preventDefault();

    if (this.mode === 'Add' &&
        this.allOriginGroupIds.find(
            id => id === this.currentOriginGroup.id!.id)) {
      MessageToast.showError(
          'An originGroup with the given id already exist. Choose an other one.');
      return;
    }

    this.originGroupService.saveOriginGroup(this.currentOriginGroup)
        .subscribe(res => {
          this.currentOriginGroup = res[0];
          const changedOrigins = this.getChangedOrigins();
          if (changedOrigins.length > 0) {
            this.originService.updateOrigins(changedOrigins)
                .subscribe(
                    result => result,
                    error => MessageToast.showError(error.message));
          }
          this.router.navigate([this.originGroupPath]);
        }, error => MessageToast.showError(error.message));
  }

  getChangedOrigins(): Origin[] {
    const changedOrigins: Origin[] = [];

    this.filteredOrigins.forEach(origin => {
      if (!isNullOrUndefined(this.selectedRows.find(
              selectedId => origin.id!.id === selectedId))) {
        if (origin.originGroupId !== this.currentOriginGroup.id!.id) {
          origin.originGroupId = this.currentOriginGroup.id!.id;
          changedOrigins.push(origin);
        }
      } else {
        if (!isNullOrUndefined(origin.originGroupId)) {
          origin.originGroupId = null;
          changedOrigins.push(origin);
        }
      }
    });

    return changedOrigins;
  }

  selectedOriginsChanged(origins: string[]) {
    this.selectedRows = origins;
  }

  // tslint:disable-next-line:no-any
  getAccountingSystemNameByObject(e: any) {
    if (isNullOrUndefined(e) || isNullOrUndefined(e.data) ||
        isNullOrUndefined(e.data.accountingSystem)) {
      return '';
    }

    const system = this.allAccountingSystems.find(
        accountingSystem => accountingSystem.id === e.data.accountingSystem);
    return system ? system.name : '';
  }

  getAccountingSystemNameById(accountingSystemId: number) {
    const system = this.allAccountingSystems.find(
        accountingSystem => accountingSystem.id === accountingSystemId);
    return system ? system.name : '';
  }

  // tslint:disable-next-line:no-any
  addPercentSign(cellInfo: any) {
    if (isNullOrUndefined(cellInfo.value)) {
      return 'n/a';
    }

    return `${Math.round(cellInfo.value * 1000) / 1000}%`;
  }

  // tslint:disable-next-line:no-any
  getAmountTypeDisplayName(e: any): string {
    if (!e || !e.valueText) {
      return 'n/a';
    }

    const paymentAmountType =
        AmountTypeList.list.find(t => t.technicalName === e.valueText);
    return (!paymentAmountType) ? 'n/a' : paymentAmountType.displayName;
  }

  // tslint:disable-next-line:no-any
  getSearchModeDisplayName(e: any): string {
    if (!e || !e.valueText) {
      return 'n/a';
    }

    const paymentAmountType = OptimizationSearchModeList.list.find(
        t => t.technicalName === e.valueText);
    return (!paymentAmountType) ? 'n/a' : paymentAmountType.displayName;
  }

  getAccountingSystemName(): string {
    const accountingSystem = this.allAccountingSystems.find(
        system => system.id === this.currentCharacteristic.accountingSystem);

    return (accountingSystem) ? accountingSystem.name : '';
  }
}
