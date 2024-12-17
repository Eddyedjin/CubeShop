import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfertaDetailPage } from './oferta-detail.page';

const routes: Routes = [
  {
    path: '',
    component: OfertaDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfertaDetailPageRoutingModule {}
