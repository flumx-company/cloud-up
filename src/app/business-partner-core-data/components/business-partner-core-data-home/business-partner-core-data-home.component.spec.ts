import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BusinessPartnerCoreDataHomeComponent} from './business-partner-core-data-home.component';

describe('BusinessPartnerCoreDataHomeComponent', () => {
  let component: BusinessPartnerCoreDataHomeComponent;
  let fixture: ComponentFixture<BusinessPartnerCoreDataHomeComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule(
            {declarations: [BusinessPartnerCoreDataHomeComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPartnerCoreDataHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
