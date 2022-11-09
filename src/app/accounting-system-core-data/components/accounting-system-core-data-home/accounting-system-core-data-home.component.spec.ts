import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AccountingSystemCoreDataHomeComponent} from './accounting-system-core-data-home.component';

describe('AccountingSystemCoreDataHomeComponent', () => {
  let component: AccountingSystemCoreDataHomeComponent;
  let fixture: ComponentFixture<AccountingSystemCoreDataHomeComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule(
            {declarations: [AccountingSystemCoreDataHomeComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingSystemCoreDataHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
