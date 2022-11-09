import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PtsApiComponent } from './pts-api.component';

describe('PtsApiComponent', () => {
  let component: PtsApiComponent;
  let fixture: ComponentFixture<PtsApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PtsApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PtsApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
