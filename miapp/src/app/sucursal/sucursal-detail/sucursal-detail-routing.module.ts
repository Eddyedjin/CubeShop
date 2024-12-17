import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SucursalDetailPage } from './sucursal-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SucursalDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SucursalDetailPageRoutingModule {}
