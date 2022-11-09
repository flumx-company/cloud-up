import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OriginGroupDetailOriginsComponent} from './origin-group-detail-origins.component';

describe('OriginGroupDetailOriginsComponent', () => {
  let component: OriginGroupDetailOriginsComponent;
  let fixture: ComponentFixture<OriginGroupDetailOriginsComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule(
            {declarations: [OriginGroupDetailOriginsComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginGroupDetailOriginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
