import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRulebookComponent } from './dashboard-rulebook.component';

describe('DashboardRulebookComponent', () => {
  let component: DashboardRulebookComponent;
  let fixture: ComponentFixture<DashboardRulebookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardRulebookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardRulebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
