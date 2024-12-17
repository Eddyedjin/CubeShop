import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabinicial/inicio',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'tabinicial',
    loadChildren: () => import('./page/tabinicial/tabinicial.module').then( m => m.TabinicialPageModule)
  },
  {
    path: 'seguridad/login',
    loadChildren: () => import('./seguridad/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'seguridad/registro',
    loadChildren: () => import('./seguridad/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'seguridad/miperfil',
    loadChildren: () => import('./seguridad/miperfil/miperfil.module').then( m => m.MiPerfilPageModule)
  },
  {
    path: 'admin/menu',
    loadChildren: () => import('./admin/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'page/listadeseados',
    loadChildren: () => import('./page/listadeseados/listadeseados.module').then( m => m.ListadeseadosPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./admin/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'page/categoria',
    loadChildren: () => import('./page/categoria/categoria.module').then( m => m.CategoriaPageModule)
  },
  {
    path: 'seguridad/editar-perfil',
    loadChildren: () => import('./seguridad/editar-perfil/editar-perfil.module').then( m => m.EditarPerfilPageModule)
  },
  {
    path: 'seguridad/configuracion-privacidad',
    loadChildren: () => import('./seguridad/configuracion-privacidad/configuracion-privacidad.module').then( m => m.ConfiguracionPrivacidadPageModule)
  },
  {
    path: 'seguridad/preferencias-notificaciones',
    loadChildren: () => import('./seguridad/preferencias-notificaciones/preferencias-notificaciones.module').then( m => m.PreferenciasNotificacionesPageModule)
  },
  {
    path: 'producto-add',
    loadChildren: () => import('./producto/producto-add/producto-add.module').then( m => m.ProductoAddPageModule)
  },
  {
    path: 'producto-list',
    loadChildren: () => import('./producto/producto-list/producto-list.module').then( m => m.ProductoListPageModule)
  },
  {
    path: 'producto-detail/:id',
    loadChildren: () => import('./producto/producto-detail/producto-detail.module').then( m => m.ProductoDetailPageModule)
  },
  {
    path: 'producto-edit/:id',
    loadChildren: () => import('./producto/producto-edit/producto-edit.module').then(m => m.ProductoEditPageModule)
  },
  {
    path: 'usuario-add',
    loadChildren: () => import('./usuario/usuario-add/usuario-add.module').then( m => m.UsuarioAddPageModule)
  },
  {
    path: 'usuario-list',
    loadChildren: () => import('./usuario/usuario-list/usuario-list.module').then( m => m.UsuarioListPageModule)
  },
  {
    path: 'usuario-detail/:id',
    loadChildren: () => import('./usuario/usuario-detail/usuario-detail.module').then( m => m.UsuarioDetailPageModule)
  },
  {
    path: 'usuario-edit/:id',
    loadChildren: () => import('./usuario/usuario-edit/usuario-edit.module').then( m => m.UsuarioEditPageModule)
  },
  {
    path: 'sucursal-add',
    loadChildren: () => import('./sucursal/sucursal-add/sucursal-add.module').then( m => m.SucursalAddPageModule)
  },
  {
    path: 'sucursal-list',
    loadChildren: () => import('./sucursal/sucursal-list/sucursal-list.module').then( m => m.SucursalListPageModule)
  },
  {
    path: 'sucursal-detail/:id',
    loadChildren: () => import('./sucursal/sucursal-detail/sucursal-detail.module').then( m => m.SucursalDetailPageModule)
  },
  {
    path: 'sucursal-edit/:id',
    loadChildren: () => import('./sucursal/sucursal-edit/sucursal-edit.module').then( m => m.SucursalEditPageModule)
  },
  {
    path: 'seguridad/quienes-somos',
    loadChildren: () => import('./seguridad/quienes-somos/quienes-somos.module').then( m => m.QuienesSomosPageModule)
  },
  {
    path: 'direccion-add',
    loadChildren: () => import('./direccion/direccion-add/direccion-add.module').then( m => m.DireccionAddPageModule)
  },
  {
    path: 'direccion-add',
    loadChildren: () => import('./direccion/direccion-add/direccion-add.module').then( m => m.DireccionAddPageModule)
  },
  {
    path: 'direccion-list',
    loadChildren: () => import('./direccion/direccion-list/direccion-list.module').then( m => m.DireccionListPageModule)
  },
  {
    path: 'direccion-detail/:id',
    loadChildren: () => import('./direccion/direccion-detail/direccion-detail.module').then( m => m.DireccionDetailPageModule)
  },
  {
    path: 'direccion-edit/:id',
    loadChildren: () => import('./direccion/direccion-edit/direccion-edit.module').then( m => m.DireccionEditPageModule)
  },
  
  {
    path: 'imagen-add',
    loadChildren: () => import('./imagen/imagen-add/imagen-add.module').then( m => m.ImagenAddPageModule)
  },
  {
    path: 'imagen-list',
    loadChildren: () => import('./imagen/imagen-list/imagen-list.module').then( m => m.ImagenListPageModule)
  },
  {
    path: 'imagen-detail/:id',
    loadChildren: () => import('./imagen/imagen-detail/imagen-detail.module').then( m => m.ImagenDetailPageModule)
  },
  {
    path: 'imagen-edit/:id',
    loadChildren: () => import('./imagen/imagen-edit/imagen-edit.module').then( m => m.ImagenEditPageModule)
  },
  {
    path: 'page/detalleproducto/:id',
    loadChildren: () => import('./page/detalleproducto/detalleproducto.module').then( m => m.DetalleproductoPageModule)
  },
  {
    path: 'page/categoria',
    loadChildren: () => import('./page/categoria/categoria.module').then( m => m.CategoriaPageModule)
  },
  {
    path: 'page/oferta',
    loadChildren: () => import('./page/oferta/oferta.module').then( m => m.OfertaPageModule)
  },
  {
    path: 'oferta-add',
    loadChildren: () => import('./ofertas/oferta-add/oferta-add.module').then( m => m.OfertaAddPageModule)
  },
  {
    path: 'oferta-list',
    loadChildren: () => import('./ofertas/oferta-list/oferta-list.module').then( m => m.OfertaListPageModule)
  },
  {
    path: 'oferta-detail/:id',
    loadChildren: () => import('./ofertas/oferta-detail/oferta-detail.module').then( m => m.OfertaDetailPageModule)
  },
  {
    path: 'oferta-edit/:id',
    loadChildren: () => import('./ofertas/oferta-edit/oferta-edit.module').then( m => m.OfertaEditPageModule)
  },
  {
    path: 'seguridad/recuperarclave',
    loadChildren: () => import('./seguridad/recuperarclave/recuperarclave.module').then( m => m.RecuperarclavePageModule)
  },
  {
    path: 'page/pago',
    loadChildren: () => import('./page/pago/pago.module').then( m => m.PagoPageModule)
  },
  {
    path: 'orden-add',
    loadChildren: () => import('./ordencompra/orden-add/orden-add.module').then( m => m.OrdenAddPageModule)
  },
  {
    path: 'orden-list',
    loadChildren: () => import('./ordencompra/orden-list/orden-list.module').then( m => m.OrdenListPageModule)
  },
  {
    path: 'orden-detail/:id',
    loadChildren: () => import('./ordencompra/orden-detail/orden-detail.module').then( m => m.OrdenDetailPageModule)
  },
  {
    path: 'orden-edit/:id',
    loadChildren: () => import('./ordencompra/orden-edit/orden-edit.module').then( m => m.OrdenEditPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
