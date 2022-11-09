import {inject, TestBed} from '@angular/core/testing';

import {AmountTypeService} from './amount-type.service';

describe('AmountTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [AmountTypeService]});
  });

  it('should be created',
     inject([AmountTypeService], (service: AmountTypeService) => {
       expect(service).toBeTruthy();
     }));
});
