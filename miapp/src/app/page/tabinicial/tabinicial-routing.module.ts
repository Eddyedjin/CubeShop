import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabinicialPage } from './tabinicial.page';

const routes: Routes = [
  {
    path: '',
    component: TabinicialPage,
    children: [
      {
        path: 'catalogo',
        loadChildren: () => import('./../../page/catalogo/catalogo.module').then(m => m.CatalogoPageModule)
      },
      {
        path: 'inicio',
        loadChildren: () => import('./../../page/inicio/inicio.module').then(m => m.InicioPageModule)
      },
      {
        path: 'cesta',
        loadChildren: () => import('./../../page/cesta/cesta.module').then(m => m.CestaPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabinicialPageRoutingModule { }
