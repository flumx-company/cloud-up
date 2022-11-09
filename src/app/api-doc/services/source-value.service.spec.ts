import { TestBed, inject } from '@angular/core/testing';

import { SourceValueService } from './source-value.service';

describe('SourceValueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SourceValueService]
    });
  });

  it('should be created', inject([SourceValueService], (service: SourceValueService) => {
    expect(service).toBeTruthy();
  }));
});
