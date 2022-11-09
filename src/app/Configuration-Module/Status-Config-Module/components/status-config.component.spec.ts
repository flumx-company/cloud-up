import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusConfigComponent } from './status-config.component';

describe('StatusConfigComponent', () => {
  let component: StatusConfigComponent;
  let fixture: ComponentFixture<StatusConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
