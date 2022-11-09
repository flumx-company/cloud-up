import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FineFilterUsageInfoComponent} from './fine-filter-usage-info.component';

describe('UsageInfoComponent', () => {
  let component: FineFilterUsageInfoComponent;
  let fixture: ComponentFixture<FineFilterUsageInfoComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({declarations: [FineFilterUsageInfoComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FineFilterUsageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
