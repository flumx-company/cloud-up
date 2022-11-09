import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTransactionalDataComponent } from './dashboard-transactional-data.component';

describe('DashboardTransactionalDataComponent', () => {
  let component: DashboardTransactionalDataComponent;
  let fixture: ComponentFixture<DashboardTransactionalDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTransactionalDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTransactionalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
