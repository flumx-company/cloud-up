import {inject, TestBed} from '@angular/core/testing';

import {RestrictionService} from './restriction.service';

describe('RestrictionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [RestrictionService]});
  });

  it('should be created',
     inject([RestrictionService], (service: RestrictionService) => {
       expect(service).toBeTruthy();
     }));
});
