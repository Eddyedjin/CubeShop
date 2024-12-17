import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfiguracionPrivacidadPage } from './configuracion-privacidad.page';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracionPrivacidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionPrivacidadPageRoutingModule {}
