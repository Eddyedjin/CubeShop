import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SucursalDetailPage } from './sucursal-detail.page';

describe('SucursalDetailPage', () => {
  let component: SucursalDetailPage;
  let fixture: ComponentFixture<SucursalDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
