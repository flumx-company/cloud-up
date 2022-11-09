import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMonitoringComponent } from './dashboard-monitoring.component';

describe('DashboardMonitoringComponent', () => {
  let component: DashboardMonitoringComponent;
  let fixture: ComponentFixture<DashboardMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
