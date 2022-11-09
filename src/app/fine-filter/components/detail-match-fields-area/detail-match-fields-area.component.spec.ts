import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailMatchFieldsAreaComponent} from './detail-match-fields-area.component';

describe('DetailMatchFieldsAreaComponent', () => {
  let component: DetailMatchFieldsAreaComponent;
  let fixture: ComponentFixture<DetailMatchFieldsAreaComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule(
            {declarations: [DetailMatchFieldsAreaComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMatchFieldsAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
