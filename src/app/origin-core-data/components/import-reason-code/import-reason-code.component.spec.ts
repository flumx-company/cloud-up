import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ImportReasonCodeComponent} from './import-reason-code.component';

describe('ImportReasonCodeComponent', () => {
  let component: ImportReasonCodeComponent;
  let fixture: ComponentFixture<ImportReasonCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [ImportReasonCodeComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportReasonCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
