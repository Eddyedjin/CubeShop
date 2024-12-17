import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DireccionAllPage } from './direccion-all.page';

const routes: Routes = [
  {
    path: '',
    component: DireccionAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DireccionAllPageRoutingModule {}

