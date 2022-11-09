import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileSequenceHomeComponent} from './profile-sequence-home.component';

describe('ProfileSequenceHomeComponent', () => {
  let component: ProfileSequenceHomeComponent;
  let fixture: ComponentFixture<ProfileSequenceHomeComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({declarations: [ProfileSequenceHomeComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSequenceHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
