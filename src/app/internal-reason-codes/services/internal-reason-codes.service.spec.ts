import { TestBed, inject } from '@angular/core/testing';

import { InternalReasonCodesService } from './internal-reason-codes.service';

describe('InternalReasonCodesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InternalReasonCodesService]
    });
  });

  it('should be created', inject([InternalReasonCodesService], (service: InternalReasonCodesService) => {
    expect(service).toBeTruthy();
  }));
});
