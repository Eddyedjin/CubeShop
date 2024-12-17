import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OfertaAddPage } from './oferta-add.page';

describe('OfertaAddPage', () => {
  let component: OfertaAddPage;
  let fixture: ComponentFixture<OfertaAddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertaAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
