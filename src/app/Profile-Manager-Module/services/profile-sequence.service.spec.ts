import {inject, TestBed} from '@angular/core/testing';

import {ProfileSequenceService} from './profile-sequence.service';

describe('ProfileSequenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [ProfileSequenceService]});
  });

  it('should be created',
     inject([ProfileSequenceService], (service: ProfileSequenceService) => {
       expect(service).toBeTruthy();
     }));
});
