import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BusinessPartnerCoreDataFormComponent} from './business-partner-core-data-form.component';

describe('BusinessPartnerCoreDataFormComponent', () => {
  let component: BusinessPartnerCoreDataFormComponent;
  let fixture: ComponentFixture<BusinessPartnerCoreDataFormComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule(
            {declarations: [BusinessPartnerCoreDataFormComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPartnerCoreDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
