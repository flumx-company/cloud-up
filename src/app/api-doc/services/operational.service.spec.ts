import { TestBed, inject } from '@angular/core/testing';

import { OperationalService } from './operational.service';

describe('OperationalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OperationalService]
    });
  });

  it('should be created', inject([OperationalService], (service: OperationalService) => {
    expect(service).toBeTruthy();
  }));
});
