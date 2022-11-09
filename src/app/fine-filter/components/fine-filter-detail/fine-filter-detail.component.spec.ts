import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FineFilterDetailComponent} from './fine-filter-detail.component';

describe('FineFilterDetailComponent', () => {
  let component: FineFilterDetailComponent;
  let fixture: ComponentFixture<FineFilterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [FineFilterDetailComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FineFilterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
