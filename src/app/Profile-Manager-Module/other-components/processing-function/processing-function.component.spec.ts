import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingFunctionComponent } from './processing-function.component';

describe('ProcessingFunctionComponent', () => {
  let component: ProcessingFunctionComponent;
  let fixture: ComponentFixture<ProcessingFunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessingFunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
