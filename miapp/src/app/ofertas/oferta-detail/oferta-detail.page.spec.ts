import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OfertaDetailPage } from './oferta-detail.page';

describe('OfertaDetailPage', () => {
  let component: OfertaDetailPage;
  let fixture: ComponentFixture<OfertaDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertaDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
