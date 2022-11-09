import { TestBed, inject } from '@angular/core/testing';

import { FieldConfigsService } from './field-configs.service';

describe('FieldConfigsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FieldConfigsService]
    });
  });

  it('should be created', inject([FieldConfigsService], (service: FieldConfigsService) => {
    expect(service).toBeTruthy();
  }));
});
