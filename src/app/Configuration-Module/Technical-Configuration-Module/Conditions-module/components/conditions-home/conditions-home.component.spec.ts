import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConditionsHomeComponent} from './conditions-home.component';

describe('AgentResolutionHomeComponent', () => {
  let component: ConditionsHomeComponent;
  let fixture: ComponentFixture<ConditionsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [ConditionsHomeComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
