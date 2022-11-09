import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {confirm} from 'devextreme/ui/dialog';
import {isNullOrUndefined} from 'util';

import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {MessageToast} from '../../../shared/helpers/message-toast';
import {InsertMetaData} from '../../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../../shared/models/update-meta-data';
import {AccountingSystemType} from '../../models/accounting-system-type';
import {EntityId} from '../../models/entity-id';
import {ErrorMessage} from '../../models/error-messages';
import {FineFilter} from '../../models/fine-filter';
import {MatchField} from '../../models/match-field';
import {MatchFields} from '../../models/match-fields';
import {MatchFieldsOI} from '../../models/match-fields-oi';
import {Operator} from '../../models/operator';
import {Restriction} from '../../models/restriction';
import {RestrictionPart} from '../../models/restriction-part';
import {FineFilterService} from '../../services/fine-filter.service';
import {RestrictionService} from '../../services/restriction.service';

@Component({
  selector: 'app-restriction-detail',
  templateUrl: './restriction-detail.component.html',
  styleUrls: ['./restriction-detail.component.css']
})
export class RestrictionDetailComponent implements OnInit {
  @Input() restrictions: Restriction[]|undefined;

  currentRestriction: Restriction;
  restrictionInfo: Restriction;
  currentPath = '';
  viewMode: string|null = '';
  // tslint:disable-next-line:no-any
  lastSelectedRowKey: any;
  hideMasterDetail = false;
  isAssignRestrictionGridHidden = true;
  currentIndex = -1;
  infoVisible = false;
  name: string|null = '';
  errors: ErrorMessage[] = [];
  error = false;
  matchTableList = MatchFields.matchTableList;
  matchFieldList: MatchField[] = [];
  matchFieldOIList = MatchFieldsOI.list;
  fineFilterList: FineFilter[] = [];
  operations = ['AND', 'OR', ''];
  accountingSystemTypes: AccountingSystemType[];
  operators: Operator[];
  usableRestrictions: Restriction[] = [];
  gridMatrix = new Map();
  filteredRestrictions: Restriction[] = [];
  customizeColumns = DataGridUtil.customizeColumns;

  constructor(
      private route: ActivatedRoute, private router: Router,
      private restrictionService: RestrictionService,
      private fineFilterService: FineFilterService) {
    this.currentRestriction = new Restriction({entityId: new EntityId()});

    this.restrictionInfo = new Restriction({
      insertMetadata: new InsertMetaData(),
      updateMetadata: new UpdateMetaData()
    });

    this.accountingSystemTypes =
        [new AccountingSystemType({technicalName: 'SAP', displayName: 'SAP'})];

    this.operators = [
      new Operator({technicalName: '', displayName: ''}),
      new Operator({technicalName: 'EQUALS', displayName: '='}),
      new Operator({technicalName: 'NOT_EQUALS', displayName: '≠'}),
      new Operator({technicalName: 'GREATER_THAN', displayName: '>'}),
      new Operator({technicalName: 'LESS_THAN', displayName: '<'}),
      new Operator({technicalName: 'GREATER_THAN_OR_EQUALS', displayName: '≥'}),
      new Operator({technicalName: 'LESS_THAN_OR_EQUALS', displayName: '≤'}),
      new Operator({technicalName: 'BETWEEN_INCLUDING', displayName: '≤≥'}),
      new Operator({technicalName: 'BETWEEN_EXCLUDING', displayName: '<>'})
    ];

    this.gridMatrix.set('startingBraces', new Map())
        .set('restriction', new Map())
        .set('matchTable', new Map())
        .set('matchField', new Map())
        .set('operator', new Map())
        .set('minValue', new Map())
        .set('maxValue', new Map())
        .set('matchFieldOI', new Map())
        .set('filterMinValue', new Map())
        .set('filterMaxValue', new Map())
        .set('endingBraces', new Map())
        .set('operation', new Map());
  }

  ngOnInit() {
    this.route.url.subscribe(url => (this.currentPath = url[0].path));

    this.route.queryParamMap.subscribe(params => {
      if (params.has('mode')) {
        this.viewMode = params.get('mode');
        if (this.viewMode === 'Edit' || this.viewMode === 'Add') {
          if (params.has('name')) {
            this.name = params.get('name');
          }

          this.currentRestriction = new Restriction({entityId: new EntityId()});

          if (!this.restrictions || this.restrictions.length <= 0) {
            this.readAllRestrictions();
          } else {
            if (this.viewMode === 'Edit') {
              this.loadCurrentRestriction();
            }
            this.filterUsableRestrictions();
          }

          if (isNullOrUndefined(this.fineFilterList) ||
              this.fineFilterList.length <= 0) {
            this.readAllFineFilter();
          }
        }
      } else {
        this.viewMode = '';
      }
    });
  }

  getButtonBackground(name: string): string {
    this.filterRestrictions(name);
    if (isNullOrUndefined(this.filteredRestrictions) ||
        this.filteredRestrictions.length <= 0) {
      return 'bg-warning';
    } else {
      return 'bg-success';
    }
  }

  filterRestrictions(name: string) {
    if (this.restrictions) {
      this.filteredRestrictions = this.restrictions.filter(
          restriction => restriction.entityId.name !== name &&
              restriction.parts.find(part => part.restriction === name));
    }
  }

  loadCurrentRestriction() {
    if (this.restrictions) {
      this.currentRestriction =
          JSON.parse(JSON.stringify(this.restrictions.find(
              restriction => restriction.entityId.name === this.name)));
    }
  }

  filterUsableRestrictions() {
    if (this.restrictions) {
      if (this.viewMode === 'Edit') {
        this.usableRestrictions = this.restrictions.filter(
            restriction => restriction.entityId.name !== this.name &&
                !restriction.parts.find(
                    part => part.restriction === this.name) &&
                restriction.accountingSystemType ===
                    this.currentRestriction.accountingSystemType);
      } else {
        if (this.currentRestriction.accountingSystemType &&
            this.currentRestriction.accountingSystemType.length > 0) {
          this.usableRestrictions = this.restrictions.filter(
              restriction => restriction.accountingSystemType ===
                  this.currentRestriction.accountingSystemType);
        } else {
          this.usableRestrictions = [];
        }
      }
    }
  }

  readAllRestrictions() {
    this.restrictionService.readAllRestrictions().subscribe(
        res => {
          this.restrictions = res;
          if (this.viewMode === 'Edit') {
            this.loadCurrentRestriction();
          }
          this.filterUsableRestrictions();
        },
        error => {
          if (error.status === 404) {
            this.restrictions = [];
            this.usableRestrictions = [];
          } else {
            MessageToast.showError(error.message);
          }
        });
  }

  readAllFineFilter() {
    this.fineFilterService.getAll().subscribe(
        res => {
          this.fineFilterList = res.filter(filter => filter.active === true);
        },
        error => {
          if (error.status !== 404) {
            MessageToast.showError(error.message);
          }
        });
  }

  navBack() {
    const result = confirm('Continue without saving?', '');
    result.then(res => {
      if (res) {
        this.router.navigate([this.currentPath]);
      }
    });
  }

  // tslint:disable-next-line:no-any
  save(e: any) {
    e.preventDefault();

    if (this.restrictions) {
      if (!isNullOrUndefined(this.restrictions.find(
              restriction => restriction.entityId.name ===
                  this.currentRestriction.entityId.name)) &&
          this.viewMode === 'Add') {
        MessageToast.showError('Name is not unique!');
        return;
      }
    }

    if (!isNullOrUndefined(this.currentRestriction.parts) &&
        this.currentRestriction.parts.length > 0) {
      this.validateParts();
    }

    if (this.error) {
      // tslint:disable-next-line:quotemark
      MessageToast.showError('Can\'t save: Errors are present');
      return;
    }

    if (this.currentRestriction.active === true) {
      this.currentRestriction.status = 'ACTIVE';
    } else {
      this.currentRestriction.status = 'INACTIVE';
    }

    this.currentRestriction.parts.forEach(part => {
      if (!part.operation || part.operation.length <= 0) {
        part.operation = null;
      }
      if (!part.operator || part.operator.length <= 0) {
        part.operator = null;
      }
    });

    if (this.viewMode === 'Edit') {
      this.restrictionService.updateRestriction(this.currentRestriction)
          .subscribe(res => {
            if (this.restrictions) {
              const index = this.restrictions.findIndex(
                  restriction =>
                      restriction.entityId.name === res.entityId.name);
              this.restrictions.splice(index, 1, res);
              this.router.navigate([this.currentPath]);
            }
          }, error => MessageToast.showError(error.message));
    } else {
      this.restrictionService.saveRestriction(this.currentRestriction)
          .subscribe(res => {
            if (this.restrictions) {
              this.restrictions.push(res);
              this.router.navigate([this.currentPath]);
            }
          }, error => MessageToast.showError(error.message));
    }
  }

  getCssClass(index: number, column: string): string {
    const columnMap = this.gridMatrix.get(column);
    if (isNullOrUndefined(columnMap)) {
      this.gridMatrix.set(column, new Map().set(index, false));
      return '';
    }

    const isErrorCell = columnMap.get(index);
    if (isNullOrUndefined(isErrorCell)) {
      columnMap.set(index, false);
      return '';
    }
    if (isErrorCell) {
      return 'errorCell';
    } else {
      return '';
    }
  }

  validateParts() {
    this.errors = [];
    this.error = false;
    this.gridMatrix.forEach((columnMap, column) => {
      columnMap.forEach(
          (isErrorCell: boolean, rowIndex: number) =>
              columnMap.set(rowIndex, false));
    });

    let startBracesCount = 0;
    let endingBracesCount = 0;

    this.currentRestriction.parts.forEach(part => {
      if (isNullOrUndefined(part.startingBraces)) {
        part.startingBraces = 0;
      }
      if (isNullOrUndefined(part.endingBraces)) {
        part.endingBraces = 0;
      }
      startBracesCount += part.startingBraces;
      endingBracesCount += part.endingBraces;

      this.checkForError(
          part.operation,
          part.index < this.currentRestriction.parts.length - 1 ?
              ErrorMessage.SELECT_OPERATION :
              ErrorMessage.LAST_OPERATION_EMPTY,
          part.index < this.currentRestriction.parts.length - 1, part.index,
          'operation');

      if (!isNullOrUndefined(part.restriction) && part.restriction.length > 0) {
        this.checkForError(
            part.matchFieldISAS, ErrorMessage.RESTRICTION_AND_MATCHFIELDS,
            false, part.index, 'restriction', 'matchFieldISAS');
        this.checkForError(
            part.matchFieldOI, ErrorMessage.RESTRICTION_AND_MATCHFIELDS, false,
            part.index, 'restriction', 'matchFieldOI');
        this.checkForError(
            part.filterMinValue, ErrorMessage.RESTRICTION_AND_MINVALUES, false,
            part.index, 'restriction', 'filterMinValue');
        this.checkForError(
            part.filterMaxValue, ErrorMessage.RESTRICTION_AND_MAXVALUES, false,
            part.index, 'restriction', 'filterMaxValue');
        this.checkForError(
            part.minValue, ErrorMessage.RESTRICTION_AND_MINVALUES, false,
            part.index, 'restriction', 'minValue');
        this.checkForError(
            part.maxValue, ErrorMessage.RESTRICTION_AND_MAXVALUES, false,
            part.index, 'restriction', 'maxValue');
      } else {
        if (!this.checkForError(
                part.matchFieldOI,
                ErrorMessage.SELECT_RESTRICTION_OR_MATCHFIELD, true, part.index,
                'restriction', 'matchFieldOI')) {
          if (!this.checkForError(
                  part.operator, ErrorMessage.SELECT_OPERATOR, true, part.index,
                  'operator')) {
            const filledFields =
                (!this.isEmpty(part.minValue) || !this.isEmpty(part.maxValue) ?
                     1 :
                     0) +
                (!this.isEmpty(part.filterMinValue) ||
                         !this.isEmpty(part.filterMaxValue) ?
                     1 :
                     0) +
                (this.isEmpty(part.matchFieldISAS) ? 0 : 1);

            if (filledFields > 1) {
              this.gridMatrix.get('minValue').set(part.index, true);
              this.gridMatrix.get('maxValue').set(part.index, true);
              this.gridMatrix.get('filterMinValue').set(part.index, true);
              this.gridMatrix.get('filterMaxValue').set(part.index, true);
              this.gridMatrix.get('matchFieldISAS').set(part.index, true);
              this.addErrorMessage(ErrorMessage.THREE_WAY_XOR);
              return;
            } else if (filledFields < 1) {
              this.gridMatrix.get('minValue').set(part.index, true);
              this.gridMatrix.get('maxValue').set(part.index, true);
              this.gridMatrix.get('filterMinValue').set(part.index, true);
              this.gridMatrix.get('filterMaxValue').set(part.index, true);
              this.gridMatrix.get('matchFieldISAS').set(part.index, true);
              this.addErrorMessage(
                  ErrorMessage.SELECT_FIELD_OR_VALUES_OR_FILTERS);
              return;
            }

            if (!this.isEmpty(part.minValue) || !this.isEmpty(part.maxValue)) {
              this.checkForError(
                  part.minValue, ErrorMessage.SELECT_MINVALUE, true, part.index,
                  'minValue');

              this.checkForError(
                  part.maxValue,
                  part.operator === 'BETWEEN_INCLUDING' ||
                          part.operator === 'BETWEEN_EXCLUDING' ?
                      ErrorMessage.SELECT_MAXVALUE :
                      ErrorMessage.EMPTY_MAXVALUE,
                  part.operator === 'BETWEEN_INCLUDING' ||
                      part.operator === 'BETWEEN_EXCLUDING',
                  part.index, 'maxValue');
            }

            if (!this.isEmpty(part.filterMinValue) ||
                !this.isEmpty(part.filterMaxValue)) {
              this.checkForError(
                  part.filterMinValue, ErrorMessage.SELECT_FILTER_MINVALUE,
                  true, part.index, 'filterMinValue');

              this.checkForError(
                  part.filterMaxValue,
                  part.operator === 'BETWEEN_INCLUDING' ||
                          part.operator === 'BETWEEN_EXCLUDING' ?
                      ErrorMessage.SELECT_MAXVALUE :
                      ErrorMessage.EMPTY_MAXVALUE,
                  part.operator === 'BETWEEN_INCLUDING' ||
                      part.operator === 'BETWEEN_EXCLUDING',
                  part.index, 'filterMaxValue');
            }

            if (!this.isEmpty(part.matchFieldISAS) &&
                (part.operator === 'BETWEEN_INCLUDING' ||
                 part.operator === 'BETWEEN_EXCLUDING')) {
              this.gridMatrix.get('matchFieldISAS').set(part.index, true);
              this.gridMatrix.get('operator').set(part.index, true);
              this.addErrorMessage(
                  ErrorMessage.CANNOT_USE_BETWEEN_AND_MATCHFIELD);
            }
          }
        }
      }
    });

    if (startBracesCount !== endingBracesCount) {
      this.addErrorMessage(ErrorMessage.BRACES_DONT_MATCH);
      const startingBracesMap = this.gridMatrix.get('startingBraces')
                                    .forEach(
                                        (isErrorCell: boolean, index: number) =>
                                            startingBracesMap.set(index, true));
      const endingBracesMap = this.gridMatrix.get('endingBraces')
                                  .forEach(
                                      (isErrorCell: boolean, index: number) =>
                                          endingBracesMap.set(index, true));
    }
  }

  addErrorMessage(message: ErrorMessage) {
    if (isNullOrUndefined(this.errors.find(error => error === message))) {
      this.errors.push(message);
    }
  }

  checkForError(
      fieldContent: string|undefined|null, errorMessage: ErrorMessage,
      emptyIsError: boolean, partIndex: number,
      ...fieldsToMark: string[]): boolean {
    let error = false;
    if (emptyIsError) {
      if (this.isEmpty(fieldContent)) {
        error = true;
      }
    } else {
      if (!this.isEmpty(fieldContent)) {
        error = true;
      }
    }
    if (error) {
      this.error = true;
      fieldsToMark.forEach(
          field => this.gridMatrix.get(field).set(partIndex, true));
      this.addErrorMessage(errorMessage);
    }

    return error;
  }

  isEmpty(field: string|undefined|null): boolean {
    return !field || field.length <= 0;
  }

  addRestrictionPart() {
    this.currentRestriction.parts.push(
        new RestrictionPart({index: this.currentRestriction.parts.length}));
    this.validateParts();
  }

  removeRestrictionPart() {
    this.currentRestriction.parts.splice(
        this.currentRestriction.parts.length - 1, 1);
    this.validateParts();
  }

  addBraces(index: number, start: boolean) {
    const restrictionPart =
        this.currentRestriction.parts.find(part => part.index === index);

    if (restrictionPart) {
      if (!restrictionPart.startingBraces) {
        restrictionPart.startingBraces = 0;
      }
      if (!restrictionPart.endingBraces) {
        restrictionPart.endingBraces = 0;
      }
      if (start) {
        restrictionPart.startingBraces++;
      } else {
        restrictionPart.endingBraces++;
      }
    }
  }

  removeBraces(index: number, start: boolean) {
    const restrictionPart =
        this.currentRestriction.parts.find(part => part.index === index);

    if (restrictionPart) {
      if (!restrictionPart.startingBraces) {
        restrictionPart.startingBraces = 0;
      }
      if (!restrictionPart.endingBraces) {
        restrictionPart.startingBraces = 0;
      }

      if (start) {
        if (restrictionPart.startingBraces > 0) {
          restrictionPart.startingBraces--;
        }
      } else {
        if (restrictionPart.endingBraces > 0) {
          restrictionPart.endingBraces--;
        }
      }
    }
  }

  showAssignRestrictionGrid(index: number) {
    if (this.restrictions) {
      if (this.currentRestriction.accountingSystemType &&
          this.currentRestriction.accountingSystemType.length > 0) {
        this.usableRestrictions = this.restrictions.filter(
            restriction => restriction.accountingSystemType ===
                this.currentRestriction.accountingSystemType);
        this.isAssignRestrictionGridHidden = false;
        this.currentIndex = index;
      } else {
        MessageToast.showError(
            'Please select an accounting system type first!');
      }
    }
  }

  clearAssignedRestriction(index: number) {
    const restrictionPart =
        this.currentRestriction.parts.find(part => part.index === index);
    if (restrictionPart) {
      restrictionPart.restriction = '';
      this.validateParts();
    }
  }

  selectRestriction(name: string) {
    const restrictionPart = this.currentRestriction.parts.find(
        part => part.index === this.currentIndex);
    if (restrictionPart) {
      restrictionPart.restriction = name;
      this.isAssignRestrictionGridHidden = true;
      this.validateParts();
    }
  }

  hideAssignRestrictionGrid() {
    this.isAssignRestrictionGridHidden = true;
  }

  getValue(index: number, valueType: string) {
    const restrictionPart =
        this.currentRestriction.parts.find(part => part.index === index);

    if (!restrictionPart) {
      return;
    }

    if (!restrictionPart[valueType]) {
      restrictionPart[valueType] = '';
    }

    return restrictionPart[valueType];
  }

  // tslint:disable-next-line:no-any
  changeValue(index: number, event: any, valueType: string) {
    const restrictionPart =
        this.currentRestriction.parts.find(part => part.index === index);

    if (!restrictionPart) {
      return;
    }

    restrictionPart[valueType] = event.value;

    if (valueType === 'matchTableISAS') {
      const matchTable = this.matchTableList.find(
          table => table.technicalName === event.value);

      if (matchTable) {
        this.matchFieldList = matchTable.matchFields;
        restrictionPart['matchFieldISAS'] = '';
      }
    }

    this.validateParts();
  }

  showInfo(name: string|null) {
    if (isNullOrUndefined(name)) {
      this.restrictionInfo = this.currentRestriction;
    } else {
      const infoObject = this.usableRestrictions.find(
          restriction => restriction.entityId.name === name);
      if (infoObject) {
        this.restrictionInfo = infoObject;
      }
    }

    if (isNullOrUndefined(this.restrictionInfo.insertMetadata)) {
      this.restrictionInfo.insertMetadata = new InsertMetaData();
    }

    if (isNullOrUndefined(this.restrictionInfo.updateMetadata)) {
      this.restrictionInfo.updateMetadata = new UpdateMetaData();
    }

    this.infoVisible = true;
  }

  showUsageInfo(name: string|null) {
    if (isNullOrUndefined(name)) {
      name = this.currentRestriction.entityId.name;
    }

    const navigationExtras:
        NavigationExtras = {queryParams: {mode: 'usageInfo', name}};

    this.router.navigate([this.currentPath], navigationExtras);
  }

  // tslint:disable-next-line:no-any
  selectionChanged(e: any) {
    e.component.collapseAll(-1);
    if (e.currentSelectedRowKeys[0] === this.lastSelectedRowKey) {
      if (this.hideMasterDetail) {
        this.hideMasterDetail = false;
        return;
      } else {
        this.hideMasterDetail = true;
      }
    } else {
      this.hideMasterDetail = false;
    }
    this.lastSelectedRowKey = e.currentSelectedRowKeys[0];
    e.component.expandRow(e.currentSelectedRowKeys[0]);
  }

  // tslint:disable-next-line:no-any
  onContentReady(e: any) {
    e.component.option('loadPanel.enabled', false);
  }

  // tslint:disable-next-line:no-any
  onFileSaving(e: any, prefix: string) {
    e.fileName = `${prefix}_${this.currentRestriction.entityId.name}`;
  }

  // tslint:disable-next-line:no-any
  onToolbarPreparing(e: any) {
    e.toolbarOptions.items.unshift(
        {
          location: 'after',
          widget: 'dxButton',
          options: {
            hint: 'Add new Part',
            icon: 'add',
            onClick: this.addRestrictionPart.bind(this)
          }
        },
        {
          location: 'after',
          widget: 'dxButton',
          options: {
            hint: 'Remove last Part',
            icon: 'revert',
            onClick: this.removeRestrictionPart.bind(this)
          }
        });
  }

  bracesAsString(bracesCount: number, start: boolean) {
    if (start) {
      return '['.repeat(bracesCount);
    } else {
      return ']'.repeat(bracesCount);
    }
  }
}
