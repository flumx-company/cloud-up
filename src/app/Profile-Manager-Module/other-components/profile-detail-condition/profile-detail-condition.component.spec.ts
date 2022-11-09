import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileDetailConditionComponent} from './profile-detail-condition.component';

describe('ProfileDetailConditionComponent', () => {
  let component: ProfileDetailConditionComponent;
  let fixture: ComponentFixture<ProfileDetailConditionComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule(
            {declarations: [ProfileDetailConditionComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDetailConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
