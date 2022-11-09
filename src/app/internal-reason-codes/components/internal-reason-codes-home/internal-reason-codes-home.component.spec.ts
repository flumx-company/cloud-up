import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalReasonCodesHomeComponent } from './internal-reason-codes-home.component';

describe('InternalReasonCodesHomeComponent', () => {
  let component: InternalReasonCodesHomeComponent;
  let fixture: ComponentFixture<InternalReasonCodesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalReasonCodesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalReasonCodesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
