import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ToleranceGroupHomeComponent} from './tolerance-group-home.component';

describe('ToleranceGroupHomeComponent', () => {
  let component: ToleranceGroupHomeComponent;
  let fixture: ComponentFixture<ToleranceGroupHomeComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({declarations: [ToleranceGroupHomeComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToleranceGroupHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
