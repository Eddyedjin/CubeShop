import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenDetailPage } from './orden-detail.page';

const routes: Routes = [
  {
    path: '',
    component: OrdenDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenDetailPageRoutingModule {}
