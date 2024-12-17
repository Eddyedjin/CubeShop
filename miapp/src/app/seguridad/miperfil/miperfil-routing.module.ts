import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiPerfilPage } from './miperfil.page';

const routes: Routes = [
  {
    path: '',
    component: MiPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiPerfilPageRoutingModule {}
