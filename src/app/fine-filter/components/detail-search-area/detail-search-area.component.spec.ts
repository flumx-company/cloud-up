import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailSearchAreaComponent} from './detail-search-area.component';

describe('DetailSearchAreaComponent', () => {
  let component: DetailSearchAreaComponent;
  let fixture: ComponentFixture<DetailSearchAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [DetailSearchAreaComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSearchAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
