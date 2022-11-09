import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReplacementDataHomeComponent} from './replacement-data-home.component';

describe('ReplacementDataHomeComponent', () => {
  let component: ReplacementDataHomeComponent;
  let fixture: ComponentFixture<ReplacementDataHomeComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({declarations: [ReplacementDataHomeComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplacementDataHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
