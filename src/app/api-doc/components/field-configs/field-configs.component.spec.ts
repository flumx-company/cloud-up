import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldConfigsComponent } from './field-configs.component';

describe('FieldConfigsComponent', () => {
  let component: FieldConfigsComponent;
  let fixture: ComponentFixture<FieldConfigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldConfigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldConfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
