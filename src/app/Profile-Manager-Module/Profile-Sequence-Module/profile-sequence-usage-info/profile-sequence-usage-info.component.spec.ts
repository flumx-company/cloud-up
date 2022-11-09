import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileSequenceUsageInfoComponent} from './profile-sequence-usage-info.component';

describe('ProfileSequenceUsageInfoComponent', () => {
  let component: ProfileSequenceUsageInfoComponent;
  let fixture: ComponentFixture<ProfileSequenceUsageInfoComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule(
            {declarations: [ProfileSequenceUsageInfoComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSequenceUsageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
