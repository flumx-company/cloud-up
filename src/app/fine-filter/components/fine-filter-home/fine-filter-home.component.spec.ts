import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FineFilterHomeComponent} from './fine-filter-home.component';

describe('FineFilterHomeComponent', () => {
  let component: FineFilterHomeComponent;
  let fixture: ComponentFixture<FineFilterHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [FineFilterHomeComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FineFilterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
