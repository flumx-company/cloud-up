import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OpenItemCoreDataHomeComponent} from './open-item-core-data-home.component';

describe('OpenItemCoreDataHomeComponent', () => {
  let component: OpenItemCoreDataHomeComponent;
  let fixture: ComponentFixture<OpenItemCoreDataHomeComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({declarations: [OpenItemCoreDataHomeComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenItemCoreDataHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
