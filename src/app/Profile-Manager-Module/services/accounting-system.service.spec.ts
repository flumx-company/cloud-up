import {inject, TestBed} from '@angular/core/testing';

import {AccountingSystemService} from './accounting-system.service';

describe('AccountingSystemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [AccountingSystemService]});
  });

  it('should be created',
     inject([AccountingSystemService], (service: AccountingSystemService) => {
       expect(service).toBeTruthy();
     }));
});
