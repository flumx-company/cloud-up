import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RestrictionUsageInfoComponent} from './restriction-usage-info.component';

describe('RestrictionUsageInfoComponent', () => {
  let component: RestrictionUsageInfoComponent;
  let fixture: ComponentFixture<RestrictionUsageInfoComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({declarations: [RestrictionUsageInfoComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrictionUsageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
