import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PaymentDifferenceComponent} from './payment-difference.component';

describe('PaymentDifferenceComponent', () => {
  let component: PaymentDifferenceComponent;
  let fixture: ComponentFixture<PaymentDifferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [PaymentDifferenceComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDifferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
