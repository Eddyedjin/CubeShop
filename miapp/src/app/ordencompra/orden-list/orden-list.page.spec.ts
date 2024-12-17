import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdenListPage } from './orden-list.page';

describe('OrdenListPage', () => {
  let component: OrdenListPage;
  let fixture: ComponentFixture<OrdenListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
