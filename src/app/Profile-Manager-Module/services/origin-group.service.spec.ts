import {inject, TestBed} from '@angular/core/testing';

import {OriginGroupService} from './origin-group.service';

describe('OriginGroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [OriginGroupService]});
  });

  it('should be created',
     inject([OriginGroupService], (service: OriginGroupService) => {
       expect(service).toBeTruthy();
     }));
});
