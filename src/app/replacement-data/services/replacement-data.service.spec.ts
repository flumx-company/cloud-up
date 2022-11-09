import {inject, TestBed} from '@angular/core/testing';

import {ReplacementDataService} from './replacement-data.service';

describe('ReplacementDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [ReplacementDataService]});
  });

  it('should be created',
     inject([ReplacementDataService], (service: ReplacementDataService) => {
       expect(service).toBeTruthy();
     }));
});
