import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BusinessPartnerCoreDataCreateComponent} from './business-partner-core-data-create.component';

describe('BusinessPartnerCoreDataCreateComponent', () => {
  let component: BusinessPartnerCoreDataCreateComponent;
  let fixture: ComponentFixture<BusinessPartnerCoreDataCreateComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule(
            {declarations: [BusinessPartnerCoreDataCreateComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPartnerCoreDataCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
