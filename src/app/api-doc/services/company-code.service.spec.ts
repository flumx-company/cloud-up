import { TestBed, inject } from '@angular/core/testing';

import { CompanyCodeService } from './company-code.service';

describe('CompanyCodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanyCodeService]
    });
  });

  it('should be created', inject([CompanyCodeService], (service: CompanyCodeService) => {
    expect(service).toBeTruthy();
  }));
});
