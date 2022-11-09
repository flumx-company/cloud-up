import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StatementHeaderViewComponent} from './statement-header-view.component';

describe('StatementHeaderViewComponent', () => {
  let component: StatementHeaderViewComponent;
  let fixture: ComponentFixture<StatementHeaderViewComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({declarations: [StatementHeaderViewComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementHeaderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
