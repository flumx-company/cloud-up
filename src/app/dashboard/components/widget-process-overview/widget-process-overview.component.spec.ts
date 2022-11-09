import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WidgetProcessOverviewComponent} from './widget-process-overview.component';

describe('WidgetProcessOverviewComponent', () => {
  let component: WidgetProcessOverviewComponent;
  let fixture: ComponentFixture<WidgetProcessOverviewComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule(
            {declarations: [WidgetProcessOverviewComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetProcessOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
