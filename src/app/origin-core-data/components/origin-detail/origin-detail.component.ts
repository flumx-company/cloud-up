import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DxDropDownBoxComponent} from 'devextreme-angular';
import ArrayStore from 'devextreme/data/array_store';
import {confirm} from 'devextreme/ui/dialog';
import {isNullOrUndefined} from 'util';

import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {DirtyCheck} from '../../../shared/helpers/dirty-check';
import {MessageToast} from '../../../shared/helpers/message-toast';
import {AmountTypeList} from '../../../shared/models/amount-type-list';
import {Bai2lockboxRelevantFieldList} from '../../../shared/models/bai2lockbox-relevant-field-list';
import {BpiRelevantFieldList} from '../../../shared/models/bpi-relevant-field-list';
import {ListObject} from '../../../shared/models/list-object';
import {PaypalRelevantFieldList} from '../../../shared/models/paypal-relevant-field-list';
import {StructuredFormats} from '../../../shared/models/structured-formats';
import {AuthService} from '../../../shared/services/auth.service';
import {AccountingSystem} from '../../models/accounting-system';
import {Characteristic} from '../../models/characteristic';
import {CurrencyConfiguration} from '../../models/currency-configuration';
import {EntityId} from '../../models/entity-id';
import {OriginFormats} from '../../models/formats';
import {ImportReasonCode} from '../../models/import-reason-code';
import {InsertMetaData} from '../../models/insert-meta-data';
import {OptimizationConfiguration} from '../../models/optimization-configuration';
import {OptimizationSearchModeList} from '../../models/optimization-search-mode-list';
import {Origin} from '../../models/origin';
import {OriginCharacteristicsSettings} from '../../models/origin-characteristics-settings';
import {OriginGroup} from '../../models/origin-group';
import {ProcessingProfileSequence} from '../../models/processing-profile-sequence';
import {UpdateMetaData} from '../../models/update-meta-data';
import {AccountingSystemService} from '../../services/accounting-system.service';
import {OriginGroupService} from '../../services/origin-group.service';
import {OriginService} from '../../services/origin.service';
import {ProfileSequenceService} from '../../services/profile-sequence.service';

@Component({
  selector: 'app-origin-detail',
  templateUrl: './origin-detail.component.html',
  styleUrls: ['./origin-detail.component.css']
})
export class OriginDetailComponent implements OnInit {
  originPath = 'origin-core-data';

  mode = '';
  modeCharacteristic = '';
  modeCurrencyConfiguration = '';
  modeImportReasonCode = '';
  modeOptimizationConfiguration = '';

  showBankCountry = true;
  showBankId = true;
  showAccountId = true;
  showBic = true;
  showIban = true;
  showIlnSender = true;
  showIlnConsignee = true;
  showEmailSender = true;
  showEmailConsignee = true;
  showEmailRecordType102 = true;
  showDocumentCurrency = true;
  showCustomerId = true;
  showTaxNumber = true;

  isCharacteristicSectionHidden = true;
  isCharacteristicFormHidden = true;
  isCurrencyConfigurationSectionHidden = true;
  isCurrencyConfigurationFormHidden = true;
  isImportReasonCodeFormHidden = true;
  isOptimizationConfigurationSectionHidden = true;
  isOptimizationConfigurationFormHidden = true;

  allAccountingSystems: AccountingSystem[] = [];
  allProfileSequences: ProcessingProfileSequence[] = [];
  allOriginGroups: OriginGroup[] = [];
  allOriginIds: string[] = [];
  originFormat = OriginFormats.list;
  structuredFormats = StructuredFormats.list;
  sourceFieldRelevantFields: ListObject[] = [];
  amountTypes = AmountTypeList.list;
  amountTypesForReasonCodes = AmountTypeList.availableForReasonCodesList;
  optimizationSearchModes = OptimizationSearchModeList.list;
  characteristicSettings = OriginCharacteristicsSettings.list;

  infoVisible = false;
  // tslint:disable-next-line:no-any
  infoObject: any;

  @ViewChild('gridBoxSelectedGroups')
  gridBoxSelectedGroups?: DxDropDownBoxComponent;

  customizeColumns = DataGridUtil.customizeColumns;

  backupOriginString = '';
  currentOrigin: Origin;
  currentCharacteristic: Characteristic;
  currentCurrencyConfiguration: CurrencyConfiguration;
  currentImportReasonCode: ImportReasonCode;
  currentOptimizationConfiguration: OptimizationConfiguration;

  name: string|undefined|null;
  tenant?: number;

  allOriginGroupsStore?: ArrayStore;
  _selectedGroups: number[] = [];

  constructor(
      private route: ActivatedRoute, private router: Router,
      private originService: OriginService,
      private originGroupService: OriginGroupService,
      private accountingSystemService: AccountingSystemService,
      private profileSequenceService: ProfileSequenceService,
      private changeDetectorRef: ChangeDetectorRef,
      private authService: AuthService) {
    try {
      this.tenant = this.authService.getTenant();
    } catch (error) {
      console.log(error);
    }
    this.currentOrigin = new Origin({id: new EntityId({tenant: this.tenant})});
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
    if (isNullOrUndefined(this.allAccountingSystems) ||
        this.allAccountingSystems.length < 1) {
      this.readAllAccountingSystems();
    }

    if (isNullOrUndefined(this.allProfileSequences) ||
        this.allProfileSequences.length < 1) {
      this.readAllProfileSequences();
    }

    if (isNullOrUndefined(this.allOriginGroups) ||
        this.allOriginGroups.length < 1 ||
        isNullOrUndefined(this.allOriginGroupsStore)) {
      this.readAllOriginGroups();
    }

    if (isNullOrUndefined(this.allOriginIds) || this.allOriginIds.length < 1) {
      this.readAllOriginIds();
    }

    this.route.params.subscribe(params => {
      if (isNullOrUndefined(params['name'])) {
        this.mode = 'Add';
        this.currentOrigin = new Origin(
            {id: new EntityId({tenant: this.tenant}), format: 'BPI'});
      } else {
        this.mode = 'Edit';
        this.name = params['name'];
        this.loadCurrentOrigin();
      }
    });
  }

  ngAfterViewChecked() {
    if (!this.currentOrigin.format || this.currentOrigin.format.length < 1) {
      return;
    }

    this.hideFields(this.currentOrigin.format);

    if (this.currentOrigin.format === 'BPI') {
      this.sourceFieldRelevantFields = BpiRelevantFieldList.list;
    } else if (this.currentOrigin.format === 'PAYPAL') {
      this.sourceFieldRelevantFields = PaypalRelevantFieldList.list;
    } else if (this.currentOrigin.format === 'BAI2_LOCKBOX') {
      this.sourceFieldRelevantFields = Bai2lockboxRelevantFieldList.list;
    }

    this.isCharacteristicSectionHidden =
        !this.structuredFormats.includes(this.currentOrigin.format);
    this.isOptimizationConfigurationSectionHidden =
        this.structuredFormats.includes(this.currentOrigin.format);
    this.isCurrencyConfigurationSectionHidden =
        !(this.currentOrigin.format === 'MT940');

    this.changeDetectorRef.detectChanges();
  }

  hideFields(format: string) {
    this.showBankCountry = false;
    this.showBankId = false;
    this.showAccountId = false;
    this.showBic = false;
    this.showIban = false;
    this.showIlnSender = false;
    this.showIlnConsignee = false;
    this.showEmailSender = false;
    this.showEmailConsignee = false;
    this.showEmailRecordType102 = false;
    this.showDocumentCurrency = false;
    this.showCustomerId = false;
    this.showTaxNumber = false;

    switch (format) {
      case 'BPI':
        this.showIlnSender = true;
        this.showIlnConsignee = true;
        break;

      case 'TIS':
        this.showEmailSender = true;
        this.showEmailConsignee = true;
        this.showEmailRecordType102 = true;
        this.showDocumentCurrency = true;
        this.showCustomerId = true;
        this.showTaxNumber = true;
        break;

      case 'BAI2_LOCKBOX':
        this.showBankCountry = true;
        this.showBankId = true;
        this.showAccountId = true;
        break;

      case 'MT940':
      case 'CAMT_053':
        this.showBankId = true;
        this.showAccountId = true;
        this.showBic = true;
        this.showIban = true;
        break;

      case 'PAYPAL':
        this.showAccountId = true;
        break;

      default:
        break;
    }
  }

  loadCurrentOrigin() {
    this.originService
        .readOrigin(new EntityId({id: this.name!, tenant: this.tenant}))
        .subscribe(res => {
          this.currentOrigin = res;
          this.backupOriginString = JSON.stringify(
              res, (key, value) => isNullOrUndefined(value) ? '' : value);
          if (!isNullOrUndefined(res) &&
              !isNullOrUndefined(res.originGroupId) &&
              this.allOriginGroupsStore) {
            this.allOriginGroupsStore.byKey(res.originGroupId)
                .then<OriginGroup>(
                    (dataItem) => this.selectedGroups = dataItem.id.id);
          }
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
        res => (
            this.allProfileSequences = res.filter(sequence => sequence.active)),
        error => {
          if (error.status === 404) {
            this.allProfileSequences = [];
          } else {
            MessageToast.showError(error.message);
          }
        });
  }

  readAllOriginGroups() {
    this.originGroupService.readAllOriginGroups().subscribe(
        res => {
          this.allOriginGroups = res;
          this.allOriginGroupsStore = new ArrayStore({data: res, key: 'id.id'});
        },
        error => {
          if (error.status === 404) {
            this.allOriginGroups = [];
          } else {
            MessageToast.showError(error.message);
          }
        });
  }

  readAllOriginIds() {
    this.originService.readAllOrigins().subscribe(
        res => {
          this.allOriginIds = res.map<string>(o => {
            if (o.id) {
              return o.id.id!;
            }
            return '';
          });
        },
        error => {
          if (error.status === 404) {
            this.allOriginIds = [];
          } else {
            MessageToast.showError(error.message);
          }
        });
  }

  getFormatType(): string {
    if (!this.currentOrigin.format || this.currentOrigin.format.length < 1) {
      return 'n/a';
    }

    if (this.structuredFormats.includes(this.currentOrigin.format)) {
      this.currentOrigin.formatType = 'STRUCTURED';
      return 'Structured';
    } else {
      this.currentOrigin.formatType = 'UNSTRUCTURED';
      return 'Unstructured';
    }
  }

  getAccountingSystemName(): string {
    const accountingSystem = this.allAccountingSystems.find(
        system => system.id === this.currentOrigin.accountingSystem);

    if (!accountingSystem) {
      return this.currentOrigin.accountingSystem + '';
    }

    return accountingSystem.name;
  }

  addCharacteristic() {
    this.currentCharacteristic = new Characteristic({
      accountingSystem: this.currentOrigin.accountingSystem,
      tenant: this.tenant
    });
    this.modeCharacteristic = 'Add';
    this.isCharacteristicFormHidden = false;
    this.showCharacteristicForm();
  }

  // tslint:disable-next-line:no-any
  editCharacteristic(characteristicId: number, event: any) {
    event.stopImmediatePropagation();

    this.currentCharacteristic =
        JSON.parse(JSON.stringify(this.currentOrigin.characteristics.find(
            characteristic => characteristic.id === characteristicId)));
    this.modeCharacteristic = 'Edit';
    this.isCharacteristicFormHidden = false;
    this.showCharacteristicForm();
  }

  // tslint:disable-next-line:no-any
  removeCharacteristic(id: number, event: any) {
    event.stopImmediatePropagation();

    const confirmResult = confirm('Are you sure you want to delete this characteristic?', 'Delete');
    confirmResult.then(res => {
      if (res) {
        this.currentOrigin.characteristics.splice(
          this.currentOrigin.characteristics.findIndex(characteristic => characteristic.id === id),
          1);
      }
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
    event.fileName = `characteristics_of_${this.currentOrigin.id!.id}`;
  }

  addCurrencyConfiguration() {
    const paymentAmountType =
        this.amountTypes.find!(t => t.technicalName === 'PAYMENTAMOUNT');
    this.currentCurrencyConfiguration = new CurrencyConfiguration({
      tenant: this.tenant,
      originId: this.currentOrigin.id!.id,
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

    this.currentCurrencyConfiguration = JSON.parse(
        JSON.stringify(this.currentOrigin.foreignCurrencyConfigurations.find(
            currencyConfiguration =>
                currencyConfiguration.id === currencyConfigurationId)));
    this.modeCurrencyConfiguration = 'Edit';
    this.isCurrencyConfigurationFormHidden = false;
    this.showCurrencyConfigurationForm();
  }

  // tslint:disable-next-line:no-any
  removeCurrencyConfiguration(currencyConfigurationId: number, event: any) {
    event.stopImmediatePropagation();

    const confirmResult = confirm('Are you sure you want to delete this foreign Currency-Module configuration?', 'Delete');
    confirmResult.then(res => {
      if (res) {
        this.currentOrigin.foreignCurrencyConfigurations.splice(
          this.currentOrigin.foreignCurrencyConfigurations.findIndex(
            currencyConfiguration => currencyConfiguration.id === currencyConfigurationId),
          1);
      }
    });
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
    event.fileName = `currencyConfigurations_of_${this.currentOrigin.id!.id}`;
  }

  addImportReasonCode() {
    this.currentImportReasonCode = new ImportReasonCode(
        {tenant: this.tenant, originId: this.currentOrigin.id!.id});

    this.modeImportReasonCode = 'Add';
    this.isImportReasonCodeFormHidden = false;
    this.showImportReasonCodeForm();
  }

  // tslint:disable-next-line:no-any
  editImportReasonCode(id: number, event: any) {
    event.stopImmediatePropagation();

    this.currentImportReasonCode =
        JSON.parse(JSON.stringify(this.currentOrigin.importReasonCodes.find(
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
      if (res) {
        this.currentOrigin.importReasonCodes.splice(
          this.currentOrigin.importReasonCodes.findIndex(importReasonCode => importReasonCode.id === id),
          1);
      }
    });
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
    event.fileName = `importReasonCodes_of_${this.currentOrigin.id!.id}`;
  }

  addOptimizationConfiguration() {
    this.currentOptimizationConfiguration = new OptimizationConfiguration({
      tenant: this.tenant,
      accountingSystem: this.currentOrigin.accountingSystem,
      originId: this.currentOrigin.id!.id,
    });

    this.modeOptimizationConfiguration = 'Add';
    this.isOptimizationConfigurationFormHidden = false;
    this.showOptimizationConfigurationForm();
  }

  // tslint:disable-next-line:no-any
  editOptimizationConfiguration(id: number, event: any) {
    event.stopImmediatePropagation();

    this.currentOptimizationConfiguration = JSON.parse(
        JSON.stringify(this.currentOrigin.optimizationConfigurations.find(
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
      if (res) {
        this.currentOrigin.optimizationConfigurations.splice(
          this.currentOrigin.optimizationConfigurations.findIndex(
            optimizationConfiguration => optimizationConfiguration.id === id),
          1);
      }
    });
  }

  showOptimizationConfigurationForm() {
    this.showForm('#optimizationConfigurationForm');
  }

  // tslint:disable-next-line:no-any
  hideOptimizationConfigurationForm(e: any) {
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
        `optimizationConfigurations_of_${this.currentOrigin.id!.id}`;
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
  showInfoOrigin(event: any) {
    event.stopImmediatePropagation();
    this.showInfo(this.currentOrigin);
  }

  // tslint:disable-next-line:no-any
  showInfoCharacteristic(id: number, event: any) {
    event.stopImmediatePropagation();
    this.showInfo(this.currentOrigin.characteristics.find(
        characteristic => characteristic.id === id));
  }

  // tslint:disable-next-line:no-any
  showInfoCurrencyConfiguration(id: number, event: any) {
    event.stopImmediatePropagation();
    this.showInfo(this.currentOrigin.foreignCurrencyConfigurations.find(
        c => c.id === id));
  }

  // tslint:disable-next-line:no-any
  showInfoImportReasonCode(id: number, event: any) {
    event.stopImmediatePropagation();
    this.showInfo(this.currentOrigin.importReasonCodes.find(c => c.id === id));
  }

  // tslint:disable-next-line:no-any
  showInfoOptimizationConfiguration(id: number, event: any) {
    event.stopImmediatePropagation();
    this.showInfo(
        this.currentOrigin.optimizationConfigurations.find(c => c.id === id));
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

  navBack() {
    const isDirty =
        DirtyCheck.isDirty(this.currentOrigin, this.backupOriginString);
    if (!isDirty) {
      this.router.navigate([this.originPath]);
      return;
    }

    const result = confirm('Continue without saving?', '');
    result.then(res => {
      if (res) {
        this.router.navigate([this.originPath]);
      }
    });
  }

  // tslint:disable-next-line:no-any
  save(e: any) {
    e.preventDefault();

    if (this.mode === 'Add' &&
        this.allOriginIds.find(id => id === this.currentOrigin.id!.id)) {
      MessageToast.showError(
          'An origin with the given id already exist. Please choose an other one.');
      return;
    }

    this.originService.saveOrigin(this.currentOrigin).subscribe(res => {
      this.currentOrigin = res[0];
      this.router.navigate([this.originPath]);
    }, error => MessageToast.showError(error.message));

    this.selectedGroups = [];
  }

  // tslint:disable-next-line:no-any
  addPercentSign(cellInfo: any) {
    if (isNullOrUndefined(cellInfo.value)) {
      return 'n/a';
    }

    return `${Math.round(cellInfo.value * 1000) / 1000}%`;
  }

  get selectedGroups(): number[] {
    return this._selectedGroups;
  }

  set selectedGroups(value: number[]) {
    this._selectedGroups = value;
    if (!value) {
      this.currentOrigin.originGroupId = null;
    } else {
      if (this.allOriginGroupsStore) {
        this.allOriginGroupsStore.byKey(value).then<OriginGroup>((dataItem) => {
          this.currentOrigin.originGroupId = dataItem.id.id;
          return dataItem.id.id;
        });
      }
    }
  }

  // tslint:disable-next-line:no-any
  selectedGroups_displayExpr(item: any) {
    return item && item.id.id;
  }

  // tslint:disable-next-line:no-any
  onRowClickOriginGroup(e: any) {
    if (this.gridBoxSelectedGroups && this.gridBoxSelectedGroups.instance) {
      this.gridBoxSelectedGroups.instance.close();
    }
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
}
