import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AccountingSystemCoreDataDetailComponent} from './accounting-system-core-data-detail.component';

describe('AccountingSystemCoreDataDetailComponent', () => {
  let component: AccountingSystemCoreDataDetailComponent;
  let fixture: ComponentFixture<AccountingSystemCoreDataDetailComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule(
            {declarations: [AccountingSystemCoreDataDetailComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingSystemCoreDataDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
