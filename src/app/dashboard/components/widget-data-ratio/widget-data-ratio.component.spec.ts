import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WidgetDataRatioComponent} from './widget-data-ratio.component';

describe('WidgetDataRatioComponent', () => {
  let component: WidgetDataRatioComponent;
  let fixture: ComponentFixture<WidgetDataRatioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [WidgetDataRatioComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetDataRatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
