import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfertaAddPage } from './oferta-add.page';

const routes: Routes = [
  {
    path: '',
    component: OfertaAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfertaAddPageRoutingModule {}
