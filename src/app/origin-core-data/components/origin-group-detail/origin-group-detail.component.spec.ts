import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OriginGroupDetailComponent} from './origin-group-detail.component';

describe('OriginGroupDetailComponent', () => {
  let component: OriginGroupDetailComponent;
  let fixture: ComponentFixture<OriginGroupDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [OriginGroupDetailComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginGroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
