import {inject, TestBed} from '@angular/core/testing';

import {OriginService} from './origin.service';

describe('OriginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [OriginService]});
  });

  it('should be created', inject([OriginService], (service: OriginService) => {
       expect(service).toBeTruthy();
     }));
});
