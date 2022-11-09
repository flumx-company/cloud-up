import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ToleranceGroupDetailComponent} from './tolerance-group-detail.component';

describe('ToleranceGroupDetailComponent', () => {
  let component: ToleranceGroupDetailComponent;
  let fixture: ComponentFixture<ToleranceGroupDetailComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({declarations: [ToleranceGroupDetailComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToleranceGroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
