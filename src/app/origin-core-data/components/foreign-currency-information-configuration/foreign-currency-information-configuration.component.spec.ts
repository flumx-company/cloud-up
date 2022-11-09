import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ForeignCurrencyInformationConfigurationComponent} from './foreign-currency-information-configuration.component';

describe('ForeignCurrencyInformationConfigurationComponent', () => {
  let component: ForeignCurrencyInformationConfigurationComponent;
  let fixture:
      ComponentFixture<ForeignCurrencyInformationConfigurationComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule(
            {declarations: [ForeignCurrencyInformationConfigurationComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
        ForeignCurrencyInformationConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
