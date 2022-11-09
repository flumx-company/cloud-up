import { TestBed, inject } from '@angular/core/testing';

import { PaymentMethodsService } from './payment-methods.service';

describe('PaymentMethodsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentMethodsService]
    });
  });

  it('should be created', inject([PaymentMethodsService], (service: PaymentMethodsService) => {
    expect(service).toBeTruthy();
  }));
});
