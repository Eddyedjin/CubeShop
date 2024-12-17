import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfiguracionPrivacidadPage } from './configuracion-privacidad.page';

describe('ConfiguracionPrivacidadPage', () => {
  let component: ConfiguracionPrivacidadPage;
  let fixture: ComponentFixture<ConfiguracionPrivacidadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionPrivacidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
