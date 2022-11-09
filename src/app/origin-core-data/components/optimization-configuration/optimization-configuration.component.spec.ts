import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OptimizationConfigurationComponent} from './optimization-configuration.component';

describe('OptimizationConfigurationComponent', () => {
  let component: OptimizationConfigurationComponent;
  let fixture: ComponentFixture<OptimizationConfigurationComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule(
            {declarations: [OptimizationConfigurationComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptimizationConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
