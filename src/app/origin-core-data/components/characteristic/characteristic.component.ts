import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Characteristic} from "../../models/characteristic";
import {isNullOrUndefined} from 'util';
import {ListObject} from "../../../shared/models/list-object";
import {MatchFieldsOI} from "../../models/match-fields-oi";
import {AccountingSystem} from "../../models/accounting-system";

@Component({
  selector: 'app-characteristic',
  templateUrl: './characteristic.component.html',
  styleUrls: ['./characteristic.component.scss']
})
export class CharacteristicComponent implements OnInit {
  @Input() @Output() characteristics: Characteristic[] = [];
  @Output() isHidden = new EventEmitter<boolean>();
  @Input() mode = '';
  @Input() currentCharacteristic?: Characteristic;
  @Input() sourceFieldRelevantFields: ListObject[] = [];
  @Input() getAccountingSystemName: Function | undefined;
  @Input() isAccountingSystemSelectable = false;
  @Input() allAccountingSystems: AccountingSystem[] = [];

  allOpenItemFields = MatchFieldsOI.list;

  validate = this.noDuplicatesExist.bind(this);

  constructor() {}

  ngOnInit() {}

  // tslint:disable-next-line:no-any
  saveCharacteristic(e: any) {
    if (!e.validationGroup.validate().isValid) {
      return;
    }

    if (this.mode === 'Add') {
      if (isNullOrUndefined(this.characteristics)) {
        this.characteristics = [];
      }

      this.characteristics.push(JSON.parse(JSON.stringify(this.currentCharacteristic)));
    } else {
      this.characteristics.splice(
        this.characteristics.findIndex(
          characteristic =>
            characteristic.id === this.currentCharacteristic!.id),
        1, JSON.parse(JSON.stringify(this.currentCharacteristic)));
    }

    this.hideCharacteristicForm(true);
  }

  hideCharacteristicForm(hide: boolean) {
    window.location.hash = '';
    this.isHidden.emit(hide);
  }

  noDuplicatesExist() : boolean {
    return !this.characteristics.some(c => c.name === this.currentCharacteristic!.name);
  }
}
