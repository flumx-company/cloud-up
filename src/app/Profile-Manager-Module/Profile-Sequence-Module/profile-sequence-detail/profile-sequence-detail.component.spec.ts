import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileSequenceDetailComponent} from './profile-sequence-detail.component';

describe('ProfileSequenceDetailComponent', () => {
  let component: ProfileSequenceDetailComponent;
  let fixture: ComponentFixture<ProfileSequenceDetailComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule(
            {declarations: [ProfileSequenceDetailComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSequenceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
