import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'appmi-perfil',
  templateUrl: './miperfil.page.html',
  styleUrls: ['./miperfil.page.scss'],
})
export class MiPerfilPage implements OnInit {
  usuario: any = {};  // Inicia el usuario como un objeto vacío

  constructor(private router: Router, private auth: SeguridadService) { }

  ngOnInit() {
    // Llama al método para obtener los datos del perfil
    this.auth.obtenerPerfilUsuario().subscribe((datosPerfil: any) => {
      if (datosPerfil) {
        this.usuario = datosPerfil;  // Asigna los datos del perfil obtenidos a `usuario`
      } else {
        console.log("Usuario no autenticado o sin datos de perfil.");
      }
    });
  }

  editarPerfil() {
    this.router.navigate(['seguridad/editar-perfil']);
  }

  privacidad() {
    this.router.navigate(['seguridad/configuracion-privacidad']);
  }

  notificacion() {
    this.router.navigate(['seguridad/preferencias-notificaciones']);
  }

  quienesSomos() {
    this.router.navigate(['seguridad/quienes-somos']);
  }

  cambiarTipoPerfil() {
    const tipo = prompt('¿Qué tipo de perfil deseas? (Administrador/Usuario)', this.usuario.tipoPerfil);
    if (tipo === 'Administrador' || tipo === 'Usuario') {
      this.usuario.tipoPerfil = tipo;
    } else {
      alert('Por favor ingresa "Administrador" o "Usuario".');
    }
  }

  cambiarClave() {
    this.router.navigate(['/seguridad/recuperarclave']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['seguridad/login']);
  }
}
