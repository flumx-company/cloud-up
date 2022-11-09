import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceGatewayComponent } from './invoice-gateway.component';

describe('InvoiceGatewayComponent', () => {
  let component: InvoiceGatewayComponent;
  let fixture: ComponentFixture<InvoiceGatewayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceGatewayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
