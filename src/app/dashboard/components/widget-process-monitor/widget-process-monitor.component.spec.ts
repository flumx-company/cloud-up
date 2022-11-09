import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WidgetProcessMonitorComponent} from './widget-process-monitor.component';

describe('WidgetProcessMonitorComponent', () => {
  let component: WidgetProcessMonitorComponent;
  let fixture: ComponentFixture<WidgetProcessMonitorComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({declarations: [WidgetProcessMonitorComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetProcessMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
