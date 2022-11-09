import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailValidationAreaComponent} from './detail-validation-area.component';

describe('DetailValidationAreaComponent', () => {
  let component: DetailValidationAreaComponent;
  let fixture: ComponentFixture<DetailValidationAreaComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({declarations: [DetailValidationAreaComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailValidationAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
