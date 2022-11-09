import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdviceHeaderViewComponent} from './advice-header-view.component';

describe('AdviceHeaderViewComponent', () => {
  let component: AdviceHeaderViewComponent;
  let fixture: ComponentFixture<AdviceHeaderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [AdviceHeaderViewComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdviceHeaderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
