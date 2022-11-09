import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {CurrencyConfiguration} from '../../models/currency-configuration';

@Component({
  selector: 'app-foreign-currency-information-configuration',
  templateUrl: './foreign-currency-information-configuration.component.html',
  styleUrls: ['./foreign-currency-information-configuration.component.scss']
})
export class ForeignCurrencyInformationConfigurationComponent implements
    OnInit {
  @Input()
  @Output()
  foreignCurrencyConfigurations: CurrencyConfiguration[] = [];
  @Output() isHidden = new EventEmitter<boolean>();
  @Input() mode = '';
  @Input() currentCurrencyConfiguration?: CurrencyConfiguration;

  constructor() {}

  ngOnInit() {}

  // tslint:disable-next-line:no-any
  saveCurrencyConfiguration(e: any) {
    if (!e.validationGroup.validate().isValid) {
      return;
    }

    if (this.mode === 'Add') {
      if (isNullOrUndefined(this.foreignCurrencyConfigurations)) {
        this.foreignCurrencyConfigurations = [];
      }

      this.foreignCurrencyConfigurations.push(
          JSON.parse(JSON.stringify(this.currentCurrencyConfiguration)));
    } else {
      this.foreignCurrencyConfigurations.splice(
          this.foreignCurrencyConfigurations.findIndex(
              currencyConfiguration => currencyConfiguration.id ===
                  this.currentCurrencyConfiguration!.id),
          1, JSON.parse(JSON.stringify(this.currentCurrencyConfiguration)));
    }

    this.hideCurrencyConfigurationForm(true);
  }

  hideCurrencyConfigurationForm(hide: boolean) {
    window.location.hash = '';
    this.isHidden.emit(hide);
  }
}
