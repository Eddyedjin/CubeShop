import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SucursalAllPage } from './sucursal-all.page';

const routes: Routes = [
  {
    path: '',
    component: SucursalAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SucursalAllPageRoutingModule {}
