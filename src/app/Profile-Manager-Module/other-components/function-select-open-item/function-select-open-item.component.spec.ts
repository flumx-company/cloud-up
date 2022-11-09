import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionSelectOpenItemComponent } from './function-select-open-item.component';

describe('FunctionSelectOpenItemComponent', () => {
  let component: FunctionSelectOpenItemComponent;
  let fixture: ComponentFixture<FunctionSelectOpenItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionSelectOpenItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionSelectOpenItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
