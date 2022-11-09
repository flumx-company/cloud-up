import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostingControlComponent } from './posting-control.component';

describe('PostingControlComponent', () => {
  let component: PostingControlComponent;
  let fixture: ComponentFixture<PostingControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostingControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostingControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
