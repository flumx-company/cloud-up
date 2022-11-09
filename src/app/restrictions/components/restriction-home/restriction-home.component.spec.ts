import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RestrictionHomeComponent} from './restriction-home.component';

describe('RestrictionHomeComponent', () => {
  let component: RestrictionHomeComponent;
  let fixture: ComponentFixture<RestrictionHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [RestrictionHomeComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrictionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
