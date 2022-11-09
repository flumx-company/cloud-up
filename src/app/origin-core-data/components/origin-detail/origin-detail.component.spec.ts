import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OriginDetailComponent} from './origin-detail.component';

describe('OriginDetailComponent', () => {
  let component: OriginDetailComponent;
  let fixture: ComponentFixture<OriginDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [OriginDetailComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
