import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionMatchAmountComponent } from './function-match-amount.component';

describe('FunctionMatchAmountComponent', () => {
  let component: FunctionMatchAmountComponent;
  let fixture: ComponentFixture<FunctionMatchAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionMatchAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionMatchAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
