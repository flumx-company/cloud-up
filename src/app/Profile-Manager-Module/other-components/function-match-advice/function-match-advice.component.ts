import {Component, Input, OnInit} from '@angular/core';

import {ToleranceGroup} from '../../models';
import {MatchAdviceConfiguration, ProcessingFunction} from '../../models/processing-functions';
import {ToleranceGroupService} from '../../services';

@Component({
  selector: 'app-function-match-advice',
  templateUrl: './function-match-advice.component.html',
  styleUrls: ['./function-match-advice.component.scss']
})
export class FunctionMatchAdviceComponent implements OnInit {
  @Input() processingFunction: ProcessingFunction = new ProcessingFunction();

  alternativeToCustomerOrSupplier: string[] = [
    'No customer / supplier was determined',
    'Exactly one customer / supplier was determined, but no advice could be linked',
    'Several customers / suppliers were determined, but no advice could be linked'
  ];
  alternativeToOtherTerms: string[] = [
    'No term was determined',
    'Exactly one term was determined, but no advice could be linked',
    'Several terms were determined, but no advice could be linked'
  ];

  toleranceGroups: ToleranceGroup[] = [];

  constructor(private toleranceGroupService: ToleranceGroupService) {}

  ngOnInit() {
    if (!this.processingFunction.matchAdviceConfiguration) {
      this.processingFunction.matchAdviceConfiguration =
          new MatchAdviceConfiguration();
    }

    this.loadToleranceGroups();
  }

  loadToleranceGroups() {
    this.toleranceGroupService.readAll().subscribe(
        res => this.toleranceGroups = res);
  }
}
