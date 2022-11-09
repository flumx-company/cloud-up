import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IsasHomeComponent} from './isas-home.component';

describe('IsasHomeComponent', () => {
  let component: IsasHomeComponent;
  let fixture: ComponentFixture<IsasHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [IsasHomeComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsasHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
