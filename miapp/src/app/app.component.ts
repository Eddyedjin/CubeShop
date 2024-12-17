import { Component } from '@angular/core';
import { AuthService } from './auth.service';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  usuarioAutenticado: boolean = false;


  public appPages = [
    { title: 'Catálogo', url: '/tabinicial/catalogo', icon: 'grid', visible: true },
    { title: 'Categoria', url: '/page/categoria', icon: 'filter', visible: true },
    { title: 'Ofertas', url: '/page/oferta', icon: 'flame', visible: true },
    { title: 'Inicio', url: '/tabinicial/inicio', icon: 'home', visible: true },
    { title: 'Cesta', url: '/tabinicial/cesta', icon: 'cart', visible: true },
    { title: 'Lista de Deseados', url: '/page/listadeseados', icon: 'bag-handle', visible: true },
    { title: 'Carrito', url: '/carrito', icon: 'flame', visible: true },
    // Opciones visibles solo para usuarios no autenticados
    { title: 'Registro', url: '/seguridad/registro', icon: 'mail', visible: true },
    { title: 'Login', url: '/seguridad/login', icon: 'log-in', visible: true },
    // Opciones visibles solo para usuarios autenticados
    { title: 'Mi perfil', url: '/seguridad/miperfil', icon: 'person', visible: false },
    { title: 'Admin', url: '/admin/menu', icon: 'server', visible: false }
  ];
  
  public labels = ['hola', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor( private authService: AuthService) { }

  ngOnInit() {
    this.authService.usuarioActual$.subscribe(usuario => {
      this.usuarioAutenticado = !!usuario; // Verifica si el usuario está autenticado

      // Ajustar visibilidad de opciones en el menú
      this.appPages.forEach(page => {
        if (page.title === 'Registro' || page.title === 'Login') {
          page.visible = !this.usuarioAutenticado;
        } else if (page.title === 'Mi perfil' || page.title === 'Admin') {
          page.visible = this.usuarioAutenticado;
        }
      });
    });
  }

  logout() {
    this.authService.logout().then(() => {
      console.log('Cierre de sesión exitoso');
    });
  }

}
