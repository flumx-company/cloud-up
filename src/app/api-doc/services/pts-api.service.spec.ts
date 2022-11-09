import { TestBed, inject } from '@angular/core/testing';

import { PtsApiService } from './pts-api.service';

describe('PtsApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PtsApiService]
    });
  });

  it('should be created', inject([PtsApiService], (service: PtsApiService) => {
    expect(service).toBeTruthy();
  }));
});
