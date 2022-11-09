import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {AccountingSystem} from '../../models/accounting-system';
import {MatchFieldsOI} from '../../models/match-fields-oi';
import {OptimizationConfiguration} from '../../models/optimization-configuration';
import {OptimizationSearchModeList} from '../../models/optimization-search-mode-list';

@Component({
  selector: 'app-optimization-configuration',
  templateUrl: './optimization-configuration.component.html',
  styleUrls: ['./optimization-configuration.component.scss']
})
export class OptimizationConfigurationComponent implements OnInit {
  @Input()
  @Output()
  optimizationConfigurations: OptimizationConfiguration[] = [];
  @Output() isHidden = new EventEmitter<boolean>();
  @Input() mode = '';
  @Input() allAccountingSystems: AccountingSystem[] = [];
  @Input() accountingSystem?: number;
  @Input() showAccountingSystem = false;
  @Input() currentOptimizationConfiguration?: OptimizationConfiguration;

  optimizationSearchModes = OptimizationSearchModeList.list;
  allOpenItemFields = MatchFieldsOI.list;

  validate = this.noDuplicatesExist.bind(this);

  constructor() {}

  ngOnInit() {}

  // tslint:disable-next-line:no-any
  saveOptimizationConfiguration(e: any) {
    if (!e.validationGroup.validate().isValid) {
      return;
    }

    if (this.mode === 'Add') {
      if (isNullOrUndefined(this.optimizationConfigurations)) {
        this.optimizationConfigurations = [];
      }

      this.optimizationConfigurations.push(
          JSON.parse(JSON.stringify(this.currentOptimizationConfiguration)));
    } else {
      this.optimizationConfigurations.splice(
          this.optimizationConfigurations.findIndex(
              optimizationConfiguration => optimizationConfiguration.id ===
                  this.currentOptimizationConfiguration!.id),
          1, JSON.parse(JSON.stringify(this.currentOptimizationConfiguration)));
    }

    this.hideOptimizationConfigurationForm(true);
  }

  hideOptimizationConfigurationForm(hide: boolean) {
    window.location.hash = '';
    this.isHidden.emit(hide);
  }

  noDuplicatesExist() : boolean {
    return !this.optimizationConfigurations.some(c => c.name === this.currentOptimizationConfiguration!.name);
  }
}
