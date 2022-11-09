import { TestBed, inject } from '@angular/core/testing';

import { LogicalSystemService } from './logical-system.service';

describe('LogicalSystemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogicalSystemService]
    });
  });

  it('should be created', inject([LogicalSystemService], (service: LogicalSystemService) => {
    expect(service).toBeTruthy();
  }));
});
