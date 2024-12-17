import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleproductoPage } from './detalleproducto.page';

describe('DetalleproductoPage', () => {
  let component: DetalleproductoPage;
  let fixture: ComponentFixture<DetalleproductoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleproductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
