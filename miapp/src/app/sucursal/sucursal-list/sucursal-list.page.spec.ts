import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SucursalListPage } from './sucursal-list.page';

describe('SucursalListPage', () => {
  let component: SucursalListPage;
  let fixture: ComponentFixture<SucursalListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
