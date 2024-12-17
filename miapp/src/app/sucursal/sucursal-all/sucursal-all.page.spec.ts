import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SucursalAllPage } from './sucursal-all.page';

describe('SucursalAllPage', () => {
  let component: SucursalAllPage;
  let fixture: ComponentFixture<SucursalAllPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
