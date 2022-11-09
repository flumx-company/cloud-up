import {inject, TestBed} from '@angular/core/testing';

import {OpenItemCoreDataService} from './open-item-core-data.service';

describe('OpenItemCoreDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [OpenItemCoreDataService]});
  });

  it('should be created',
     inject([OpenItemCoreDataService], (service: OpenItemCoreDataService) => {
       expect(service).toBeTruthy();
     }));
});
