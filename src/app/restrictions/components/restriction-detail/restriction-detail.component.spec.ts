import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RestrictionDetailComponent} from './restriction-detail.component';

describe('RestrictionDetailComponent', () => {
  let component: RestrictionDetailComponent;
  let fixture: ComponentFixture<RestrictionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [RestrictionDetailComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrictionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
