import {inject, TestBed} from '@angular/core/testing';

import {ConditionService} from './condition.service';

describe('AgentResolutionRule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [ConditionService]});
  });

  it('should be created',
     inject([ConditionService], (service: ConditionService) => {
       expect(service).toBeTruthy();
     }));
});
