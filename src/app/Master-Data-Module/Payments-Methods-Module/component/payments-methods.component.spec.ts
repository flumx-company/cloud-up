import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsMethodsComponent } from './payments-methods.component';

describe('PaymentsMethodsComponent', () => {
  let component: PaymentsMethodsComponent;
  let fixture: ComponentFixture<PaymentsMethodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsMethodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
