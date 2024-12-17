import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage {
  usuario: any = {
    nombre: 'Maria',
    apmaterno: 'Gutierrez',
    appaterno: 'Gómez',
    correo: 'm.gutierrez@example.com',
    telefono: '+56952356012',
    direccion: 'Calle Freire 520, San Bernardo, País',
    imagenPerfil: 'assets/img/profile-placeholder.png',
  };

  imageOptions: string[] = [
    'assets/img/profile-placeholder.png',
    'assets/img/profile-image1.png',
    'assets/img/profile-image2.png'
  ];

  constructor(private router: Router) {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.usuario = JSON.parse(storedUser);
    }
  }

  seleccionarImagen(imagen: string) {
    this.usuario.imagenPerfil = imagen;
  }

  guardarCambios() {
    localStorage.setItem('user', JSON.stringify(this.usuario));
    this.router.navigate(['/mi-perfil']);
  }

  // Método para manejar la navegación de regreso al perfil
  regresar() {
    this.router.navigate(['seguridad/miperfil']);
  }
}