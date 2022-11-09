import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BusinessPartnerSharedFormComponent} from './business-partner-shared-form.component';

describe('BusinessPartnerSharedFormComponent', () => {
  let component: BusinessPartnerSharedFormComponent;
  let fixture: ComponentFixture<BusinessPartnerSharedFormComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule(
            {declarations: [BusinessPartnerSharedFormComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPartnerSharedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
