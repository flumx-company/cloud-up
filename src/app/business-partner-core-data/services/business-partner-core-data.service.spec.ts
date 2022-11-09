import {inject, TestBed} from '@angular/core/testing';

import {BusinessPartnerCoreDataService} from './business-partner-core-data.service';

describe('BusinessPartnerCoreDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(
        {providers: [BusinessPartnerCoreDataService]});
  });

  it('should be created',
     inject(
         [BusinessPartnerCoreDataService],
         (service: BusinessPartnerCoreDataService) => {
           expect(service).toBeTruthy();
         }));
});
