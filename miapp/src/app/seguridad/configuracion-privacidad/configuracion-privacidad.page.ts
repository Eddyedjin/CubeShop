import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracion-privacidad',
  templateUrl: './configuracion-privacidad.page.html',
  styleUrls: ['./configuracion-privacidad.page.scss'],
})
export class ConfiguracionPrivacidadPage {

  constructor(private router: Router) { }

  // Método para manejar la navegación de regreso al perfil
  regresar() {
    this.router.navigate(['seguridad/miperfil']);
  }
}