import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicalSystemComponent } from './logical-system.component';

describe('LogicalSystemComponent', () => {
  let component: LogicalSystemComponent;
  let fixture: ComponentFixture<LogicalSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogicalSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicalSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
