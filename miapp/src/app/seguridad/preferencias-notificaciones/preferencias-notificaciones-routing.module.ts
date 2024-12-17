import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreferenciasNotificacionesPage } from './preferencias-notificaciones.page';

const routes: Routes = [
  {
    path: '',
    component: PreferenciasNotificacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreferenciasNotificacionesPageRoutingModule {}
