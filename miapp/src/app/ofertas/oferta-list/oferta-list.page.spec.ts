import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OfertaListPage } from './oferta-list.page';

describe('OfertaListPage', () => {
  let component: OfertaListPage;
  let fixture: ComponentFixture<OfertaListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertaListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
