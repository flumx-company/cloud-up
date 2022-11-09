import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { sapUi5 } from './sapui5-open.component';

describe('ReportingComponent', () => {
  let component: sapUi5;
  let fixture: ComponentFixture<sapUi5>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ sapUi5 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(sapUi5);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
