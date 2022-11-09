import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OpenItemCoreDataEditComponent} from './open-item-core-data-edit.component';


describe('OpenItemCoreDataEditComponent', () => {
  let component: OpenItemCoreDataEditComponent;
  let fixture: ComponentFixture<OpenItemCoreDataEditComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({declarations: [OpenItemCoreDataEditComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenItemCoreDataEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
