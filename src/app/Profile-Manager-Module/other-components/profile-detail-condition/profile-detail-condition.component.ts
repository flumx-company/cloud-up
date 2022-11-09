import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DxDataGridComponent} from 'devextreme-angular';
import * as moment from 'moment';
import {isNullOrUndefined} from 'util';

import {InfoPopupComponent} from '../../../shared/components/info-popup/info-popup.component';
import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {MessageToast} from '../../../shared/helpers/message-toast';
import {ISAS} from '../../../shared/models/isas';
import {ListObject} from '../../../shared/models/list-object';
import {OperatorList} from '../../../shared/models/operator-list';
import {Condition, ConditionPart, EntityId, ProcessingProfile} from '../../models';
import {ErrorMessage} from '../../models/error-messages';
import {ConditionService} from '../../services';

@Component({
  selector: 'app-profile-detail-condition',
  templateUrl: './profile-detail-condition.component.html',
  styleUrls: ['./profile-detail-condition.component.css']
})
export class ProfileDetailConditionComponent implements OnInit {
  @ViewChild(InfoPopupComponent) infoPopup?: InfoPopupComponent;
  @ViewChild('assignCondition') assignConditionGrid?: DxDataGridComponent;
  @Input() currentProfile: ProcessingProfile = new ProcessingProfile();
  @Input() currentCondition: Condition = new Condition();
  @Input() usableConditions: Condition[] = [];
  @Output() onValidationError = new EventEmitter<string>();
  // tslint:disable-next-line:no-any
  @Output() onValidationSuccess = new EventEmitter<any>();

  matchTableList = ISAS.tables;
  matchFieldList: ListObject[] = [];
  operations = ['AND', 'OR'];
  operators = OperatorList.list;
  isAssignConditionGridHidden = true;

  customizeColumns = DataGridUtil.customizeColumns;
  private usedConditions: EntityId[] = [];
  private error = false;
  private gridMatrix = new Map();
  private currentIndex = -1;
  private conditionPath = 'Conditions-module';
  private errors: ErrorMessage[] = [];

  constructor(private conditionService: ConditionService) {
    this.gridMatrix.set('startingBraces', new Map())
        .set('condition', new Map())
        .set('matchField', new Map())
        .set('operator', new Map())
        .set('minValue', new Map())
        .set('maxValue', new Map())
        .set('endingBraces', new Map())
        .set('operation', new Map());
  }

  ngOnInit() {
    setTimeout(() => this.determineUsage(), 100);
  }

  @Input()
  set formatType(formatType: string) {
    if (formatType === 'LOCKBOX') {
      this.matchTableList = ISAS.tables;
    } else {
      this.matchTableList = ISAS.tables.filter(
          table => table.type === formatType || table.type === 'ALL');
    }
  }

  validateCondition() {
    if (this.currentCondition) {
      if (!this.currentCondition.parts ||
          this.currentCondition.parts.length < 1) {
        this.onValidationError.emit('No condition assigned!');
        return;
      }

      this.validateParts();
      if (this.error) {
        this.onValidationError.emit(this.errors[0]);
        return;
      }

      this.onValidationSuccess.emit();
    }
  }

  showInfo(entityId: EntityId) {
    if (this.infoPopup) {
      this.infoPopup.showInfoForObject(this.usableConditions.find(
          con => con.entityId.name === entityId.name));
    }
  }

  showUsageInfo(entityId: EntityId) {
    window.open(
        `${location.protocol}//${location.host}${
            this.conditionPath}/usageInfo/${entityId.name}`,
        '_blank');
  }

  private determineUsage() {
    if (this.usableConditions.length > 0) {
      this.conditionService
          .determineUsage(
              this.usableConditions.map(condition => condition.entityId))
          .subscribe(
              res => (this.usedConditions = res),
              error => MessageToast.showError(error.message));
    }
  }

  addConditionPart() {
    this.currentCondition.parts.push(
        new ConditionPart({index: this.currentCondition.parts.length}));

    this.validateParts();
  }

  removeConditionPart() {
    this.currentCondition.parts.splice(
        this.currentCondition.parts.length - 1, 1);
    this.validateParts();
  }

  addBraces(index: number, start: boolean) {
    const conditionPart =
        this.currentCondition.parts.find(part => part.index === index);
    if (conditionPart) {
      if (!conditionPart.startingBraces) {
        conditionPart.startingBraces = 0;
      }
      if (!conditionPart.endingBraces) {
        conditionPart.endingBraces = 0;
      }
      if (start) {
        conditionPart.startingBraces++;
      } else {
        conditionPart.endingBraces++;
      }
    }
  }

  removeBraces(index: number, start: boolean) {
    const conditionPart =
        this.currentCondition.parts.find(part => part.index === index);

    if (conditionPart) {
      if (!conditionPart.startingBraces) {
        conditionPart.startingBraces = 0;
      }
      if (!conditionPart.endingBraces) {
        conditionPart.endingBraces = 0;
      }

      if (start) {
        if (conditionPart.startingBraces > 0) {
          conditionPart.startingBraces--;
        }
      } else {
        if (conditionPart.endingBraces > 0) {
          conditionPart.endingBraces--;
        }
      }
    }
  }

  showAssignConditionGrid(index: number) {
    this.isAssignConditionGridHidden = false;
    this.currentIndex = index;

    setTimeout(() => {
      if (this.assignConditionGrid && this.assignConditionGrid.instance) {
        this.assignConditionGrid.instance.repaint();
      }
    });

    setTimeout(() => {
      const element = document.querySelector('#assignConditionGrid');
      if (element) {
        element.scrollIntoView(
            {behavior: 'smooth', block: 'start', inline: 'nearest'});
      }
    }, 100);
  }

  clearAssignedCondition(index: number) {
    const conditionPart =
        this.currentCondition.parts.find(part => part.index === index);
    if (conditionPart) {
      conditionPart.condition = '';
      this.validateParts();
    }
  }

  selectCondition(entity: EntityId) {
    const conditionPart = this.currentCondition.parts.find(
        part => part.index === this.currentIndex);
    if (conditionPart) {
      conditionPart.condition = entity.name;
      this.hideAssignConditionGrid();
      this.validateParts();
    }
  }

  hideAssignConditionGrid() {
    this.isAssignConditionGridHidden = true;
    window.location.hash = '';
  }

  getMatchFieldList(index: number): ListObject[] {
    const conditionPart =
        this.currentCondition.parts.find(part => part.index === index);

    if (!conditionPart) {
      return [];
    }

    const table = this.matchTableList.find(
        table => table.technicalName === conditionPart.matchTable);

    if (!table) {
      return [];
    }

    return table.isasFields;
  }

  getValue(index: number, valueType: string) {
    const conditionPart =
        this.currentCondition.parts.find(part => part.index === index);

    if (!conditionPart) {
      return '';
    }

    if (isNullOrUndefined(conditionPart[valueType])) {
      conditionPart[valueType] = '';
    }

    return conditionPart[valueType];
  }

  // tslint:disable-next-line:no-any
  changeValue(index: number, event: any, valueType: string) {
    const conditionPart =
        this.currentCondition.parts.find(part => part.index === index);

    if (!conditionPart) {
      return;
    }

    conditionPart[valueType] = event.value;

    if (valueType === 'matchTable') {
      const matchTable = this.matchTableList.find(
          table => table.technicalName === event.value);
      if (matchTable) {
        this.matchFieldList = matchTable.isasFields;
      }

      conditionPart['matchField'] = '';
    }

    this.validateParts();
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

  // tslint:disable-next-line:no-any
  onFileSaving(e: any, prefix: string) {
    e.fileName = `${prefix}_${this.currentProfile.profileId.name}`;
  }

  getButtonBackground(entityId: EntityId): string {
    if (!isNullOrUndefined(this.usedConditions) &&
        this.usedConditions.length > 1 &&
        !isNullOrUndefined(this.usedConditions.find(
            conditionId => entityId.name === conditionId.name))) {
      return 'bg-success';
    } else {
      return 'bg-warning';
    }
  }

  // tslint:disable-next-line:no-any
  onToolbarPreparingConditionGrid(event: any) {
    event.toolbarOptions.items.unshift(
        {
          location: 'after',
          widget: 'dxButton',
          options: {
            hint: 'Add new Part',
            icon: 'add',
            onClick: this.addConditionPart.bind(this)
          }
        },
        {
          location: 'after',
          widget: 'dxButton',
          options: {
            hint: 'Remove last Part',
            icon: 'revert',
            onClick: this.removeConditionPart.bind(this)
          }
        });
  }

  private validateParts() {
    this.errors = [];
    this.error = false;
    this.gridMatrix.forEach((columnMap, column) => {
      columnMap.forEach(
          (isErrorCell: boolean, rowIndex: number) =>
              columnMap.set(rowIndex, false));
    });

    let startBracesCount = 0;
    let endingBracesCount = 0;

    this.currentCondition.parts.forEach(part => {
      if (!part.startingBraces) {
        part.startingBraces = 0;
      }
      if (!part.endingBraces) {
        part.endingBraces = 0;
      }
      startBracesCount += part.startingBraces;
      endingBracesCount += part.endingBraces;

      if (part.index < this.currentCondition.parts.length - 1) {
        this.checkForError(
            part.operation, ErrorMessage.SELECT_OPERATION, true, part.index,
            'operation');
      } else {
        this.checkForError(
            part.operation, ErrorMessage.LAST_OPERATION_EMPTY, false,
            part.index, 'operation');
      }

      if (part.condition && part.condition.length > 0) {
        this.checkForError(
            part.matchField, ErrorMessage.CONDITION_AND_MATCHFIELD, false,
            part.index, 'condition', 'matchField');
        this.checkForError(
            part.minValue, ErrorMessage.CONDITION_AND_MINVALUE, false,
            part.index, 'condition', 'minValue');
        this.checkForError(
            part.maxValue, ErrorMessage.CONDITION_AND_MAXVALUE, false,
            part.index, 'condition', 'maxValue');
      } else {
        if (!this.checkForError(
                part.matchField, ErrorMessage.SELECT_CONDITION_OR_MATCHFIELD,
                true, part.index, 'condition', 'matchField')) {
          if (!this.checkForError(
                  part.operator, ErrorMessage.SELECT_OPERATOR, true, part.index,
                  'operator')) {
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
                        part.operator === 'BETWEEN_EXCLUDING' ?
                    true :
                    false,
                part.index, 'maxValue');

            if (ISAS.isDateField(part.matchField)) {
              const minDate = moment(part.minValue, 'DD.MM.YYYY', true);
              if (!minDate.isValid()) {
                this.gridMatrix.get('minValue').set(part.index, true);
                this.addErrorMessage(ErrorMessage.MIN_VALUE_NOT_A_DATE);
                this.error = true;
              } else if (
                  part.operator === 'BETWEEN_INCLUDING' ||
                  part.operator === 'BETWEEN_EXCLUDING') {
                const maxDate = moment(part.maxValue, 'DD.MM.YYYY', true);
                if (maxDate.isValid()) {
                  if (minDate.diff(maxDate) > 0) {
                    this.gridMatrix.get('minValue').set(part.index, true);
                    this.gridMatrix.get('maxValue').set(part.index, true);
                    this.addErrorMessage(ErrorMessage.MIN_DATE_AFTER_MAX_DATE);
                    this.error = true;
                  }
                } else {
                  this.gridMatrix.get('maxValue').set(part.index, true);
                  this.addErrorMessage(ErrorMessage.MAX_VALUE_NOT_A_DATE);
                  this.error = true;
                }
              }
            } else if (
                part.operator !== 'EQUALS' && part.operator !== 'NOT_EQUALS') {
              const minNumber = Number(part.minValue);
              if (isNaN(minNumber)) {
                this.gridMatrix.get('minValue').set(part.index, true);
                this.addErrorMessage(ErrorMessage.MIN_VALUE_NOT_A_NUMBER);
                this.error = true;
              } else if (
                  part.operator === 'BETWEEN_INCLUDING' ||
                  part.operator === 'BETWEEN_EXCLUDING') {
                const maxNumber = Number(part.maxValue);
                if (isNaN(maxNumber)) {
                  this.gridMatrix.get('maxValue').set(part.index, true);
                  this.addErrorMessage(ErrorMessage.MAX_VALUE_NOT_A_NUMBER);
                  this.error = true;
                } else if (minNumber > maxNumber) {
                  this.gridMatrix.get('minValue').set(part.index, true);
                  this.gridMatrix.get('maxValue').set(part.index, true);
                  this.addErrorMessage(
                      ErrorMessage.MAX_VALUE_LESS_THAN_MIN_VALUE);
                  this.error = true;
                }
              }
            }
          }
        }
      }
    });

    if (startBracesCount !== endingBracesCount) {
      this.addErrorMessage(ErrorMessage.BRACES_DONT_MATCH);
      this.gridMatrix.get('startingBraces')
          .forEach(
              (isErrorCell: boolean, index: number) =>
                  this.gridMatrix.get('startingBraces').set(index, true));
      this.gridMatrix.get('endingBraces')
          .forEach(
              (isErrorCell: boolean, index: number) =>
                  this.gridMatrix.get('endingBraces').set(index, true));
    }
  }

  private addErrorMessage(message: ErrorMessage) {
    if (this.errors &&
        isNullOrUndefined(this.errors.find(error => error === message))) {
      this.errors.push(message);
    }
  }

  private checkForError(
      fieldContent: string|undefined|null, errorMessage: ErrorMessage,
      emptyIsError: boolean, partIndex: number,
      ...fieldsToMark: string[]): boolean {
    let error = false;
    if (emptyIsError) {
      if (!fieldContent || fieldContent.length <= 0) {
        error = true;
      }
    } else {
      if (fieldContent && fieldContent.length > 0) {
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

  bracesAsString(bracesCount: number, start: boolean): string {
    if (start) {
      return '['.repeat(bracesCount);
    } else {
      return ']'.repeat(bracesCount);
    }
  }

  // tslint:disable-next-line:no-any
  getTableDisplayName(technicalName: any): string {
    return ListObject.getDisplayName(technicalName.value, ISAS.tables);
  }

  // tslint:disable-next-line:no-any
  getFieldDisplayName(technicalName: any): string {
    return ListObject.getDisplayName(
        technicalName.value,
        ([] as ListObject[])
            .concat(...ISAS.tables.map(table => table.isasFields)));
  }

  // tslint:disable-next-line:no-any
  getOperatorDisplayName(technicalName: any): string {
    return ListObject.getDisplayName(technicalName.value, OperatorList.list);
  }

  // tslint:disable-next-line:no-any
  dropDownOpened(event: any) {
    setTimeout(() => event.component._popup.option('width', 260));
  }

  // tslint:disable-next-line:no-any
  dropDownContentReady(event: any) {
    setTimeout(() => event.component._popup.option('width', 260));
  }

  getISASTableDescription(index: number) {
    const conditionPart =
        this.currentCondition.parts.find(part => part.index === index);

    if (!conditionPart) {
      return;
    }

    const matchTable = this.matchTableList.find(
        table => table.technicalName === conditionPart.matchTable);
    if (matchTable) {
      this.matchFieldList = matchTable.isasFields;
      return matchTable.description;
    }

    return;
  }

  getISASFieldDescription(index: number) {
    const conditionPart =
        this.currentCondition.parts.find(part => part.index === index);

    if (!conditionPart) {
      return;
    }

    const allFields =
        ([] as ListObject[])
            .concat(...ISAS.tables.map(table => table.isasFields));
    const field = allFields.find(
        field => field.technicalName === conditionPart.matchField);

    if (field) {
      return field.description;
    }

    return;
  }
}
