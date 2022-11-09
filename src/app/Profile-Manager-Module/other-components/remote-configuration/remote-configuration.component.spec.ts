import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteConfigurationComponent } from './remote-configuration.component';

describe('RemoteConfigurationComponent', () => {
  let component: RemoteConfigurationComponent;
  let fixture: ComponentFixture<RemoteConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoteConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
