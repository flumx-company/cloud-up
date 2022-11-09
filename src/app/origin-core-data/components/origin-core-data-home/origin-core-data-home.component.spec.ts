import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OriginCoreDataHomeComponent} from './origin-core-data-home.component';

describe('OriginCoreDataHomeComponent', () => {
  let component: OriginCoreDataHomeComponent;
  let fixture: ComponentFixture<OriginCoreDataHomeComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({declarations: [OriginCoreDataHomeComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginCoreDataHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
