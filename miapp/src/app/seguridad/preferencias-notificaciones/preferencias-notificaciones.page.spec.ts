import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreferenciasNotificacionesPage } from './preferencias-notificaciones.page';

describe('PreferenciasNotificacionesPage', () => {
  let component: PreferenciasNotificacionesPage;
  let fixture: ComponentFixture<PreferenciasNotificacionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenciasNotificacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
