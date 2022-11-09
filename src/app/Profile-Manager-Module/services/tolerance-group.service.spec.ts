import {inject, TestBed} from '@angular/core/testing';

import {ToleranceGroupService} from './tolerance-group.service';

describe('ToleranceGroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [ToleranceGroupService]});
  });

  it('should be created',
     inject([ToleranceGroupService], (service: ToleranceGroupService) => {
       expect(service).toBeTruthy();
     }));
});
