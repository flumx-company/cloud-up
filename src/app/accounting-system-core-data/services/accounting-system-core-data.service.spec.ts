import {inject, TestBed} from '@angular/core/testing';

import {AccountingSystemCoreDataService} from './accounting-system-core-data.service';

describe('AccountingSystemCoreDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(
        {providers: [AccountingSystemCoreDataService]});
  });

  it('should be created',
     inject(
         [AccountingSystemCoreDataService],
         (service: AccountingSystemCoreDataService) => {
           expect(service).toBeTruthy();
         }));
});
