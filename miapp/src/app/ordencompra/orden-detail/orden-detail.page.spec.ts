import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdenDetailPage } from './orden-detail.page';

describe('OrdenDetailPage', () => {
  let component: OrdenDetailPage;
  let fixture: ComponentFixture<OrdenDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
