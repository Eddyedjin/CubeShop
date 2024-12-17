import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdenAddPage } from './orden-add.page';

describe('OrdenAddPage', () => {
  let component: OrdenAddPage;
  let fixture: ComponentFixture<OrdenAddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
