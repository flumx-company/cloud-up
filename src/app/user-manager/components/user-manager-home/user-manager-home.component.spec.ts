import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserManagerHomeComponent} from './user-manager-home.component';

describe('UserManagerHomeComponent', () => {
  let component: UserManagerHomeComponent;
  let fixture: ComponentFixture<UserManagerHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [UserManagerHomeComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
