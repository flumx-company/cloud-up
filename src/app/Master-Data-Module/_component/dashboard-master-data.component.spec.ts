import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMasterDataComponent } from './dashboard-master-data.component';

describe('DashboardMasterDataComponent', () => {
  let component: DashboardMasterDataComponent;
  let fixture: ComponentFixture<DashboardMasterDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMasterDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMasterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
