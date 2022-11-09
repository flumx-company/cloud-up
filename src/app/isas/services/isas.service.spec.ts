import {inject, TestBed} from '@angular/core/testing';

import {IsasService} from './isas.service';

describe('IsasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [IsasService]});
  });

  it('should be created', inject([IsasService], (service: IsasService) => {
       expect(service).toBeTruthy();
     }));
});
