import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionMatchAdviceComponent } from './function-match-advice.component';

describe('FunctionMatchAdviceComponent', () => {
  let component: FunctionMatchAdviceComponent;
  let fixture: ComponentFixture<FunctionMatchAdviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionMatchAdviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionMatchAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
