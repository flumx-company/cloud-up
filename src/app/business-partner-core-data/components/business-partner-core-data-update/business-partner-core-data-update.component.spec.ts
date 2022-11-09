import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BusinessPartnerCoreDataUpdateComponent} from './business-partner-core-data-update.component';

describe('BusinessPartnerCoreDataUpdateComponent', () => {
  let component: BusinessPartnerCoreDataUpdateComponent;
  let fixture: ComponentFixture<BusinessPartnerCoreDataUpdateComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule(
            {declarations: [BusinessPartnerCoreDataUpdateComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPartnerCoreDataUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
