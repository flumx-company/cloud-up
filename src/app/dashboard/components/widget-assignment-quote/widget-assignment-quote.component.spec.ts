import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WidgetAssignmentQuoteComponent} from './widget-assignment-quote.component';

describe('WidgetAssignmentQuoteComponent', () => {
  let component: WidgetAssignmentQuoteComponent;
  let fixture: ComponentFixture<WidgetAssignmentQuoteComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule(
            {declarations: [WidgetAssignmentQuoteComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetAssignmentQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
