import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DireccionDetailPage } from './direccion-detail.page';

describe('DireccionDetailPage', () => {
  let component: DireccionDetailPage;
  let fixture: ComponentFixture<DireccionDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DireccionDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
