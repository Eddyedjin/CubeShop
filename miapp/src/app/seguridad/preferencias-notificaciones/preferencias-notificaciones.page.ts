import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preferencias-notificaciones',
  templateUrl: './preferencias-notificaciones.page.html',
  styleUrls: ['./preferencias-notificaciones.page.scss'],
})
export class PreferenciasNotificacionesPage {

  constructor(private router: Router) { }

  // Método para manejar la navegación de regreso al perfil
  regresar() {
    this.router.navigate(['seguridad/miperfil']);
  }
}