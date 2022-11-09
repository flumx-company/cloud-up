import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTechnicalComponent } from './general-technical.component';

describe('GeneralTechnicalComponent', () => {
  let component: GeneralTechnicalComponent;
  let fixture: ComponentFixture<GeneralTechnicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralTechnicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralTechnicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
