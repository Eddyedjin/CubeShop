import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdenEditPage } from './orden-edit.page';

describe('OrdenEditPage', () => {
  let component: OrdenEditPage;
  let fixture: ComponentFixture<OrdenEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
