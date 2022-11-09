import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationMenuComponent } from './configuration-menu.component';

describe('DashboardConfigurationComponent', () => {
  let component: ConfigurationMenuComponent;
  let fixture: ComponentFixture<ConfigurationMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
