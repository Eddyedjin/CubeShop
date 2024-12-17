import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OfertaEditPage } from './oferta-edit.page';

describe('OfertaEditPage', () => {
  let component: OfertaEditPage;
  let fixture: ComponentFixture<OfertaEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertaEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
