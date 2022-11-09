import {inject, TestBed} from '@angular/core/testing';

import {FineFilterService} from './fine-filter.service';

describe('FineFilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [FineFilterService]});
  });

  it('should be created',
     inject([FineFilterService], (service: FineFilterService) => {
       expect(service).toBeTruthy();
     }));
});
