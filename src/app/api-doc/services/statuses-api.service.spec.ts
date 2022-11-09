import { TestBed, inject } from '@angular/core/testing';

import { StatusesApiService } from './statuses-api.service';

describe('StatusesApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatusesApiService]
    });
  });

  it('should be created', inject([StatusesApiService], (service: StatusesApiService) => {
    expect(service).toBeTruthy();
  }));
});
