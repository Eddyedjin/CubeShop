import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DireccionAddPage } from './direccion-add.page';

const routes: Routes = [
  {
    path: '',
    component: DireccionAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DireccionAddPageRoutingModule {}


