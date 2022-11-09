import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileUsageInfoComponent} from './profile-usage-info.component';

describe('ProfileUsageInfoComponent', () => {
  let component: ProfileUsageInfoComponent;
  let fixture: ComponentFixture<ProfileUsageInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [ProfileUsageInfoComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUsageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
