import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfertaListPage } from './oferta-list.page';

const routes: Routes = [
  {
    path: '',
    component: OfertaListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfertaListPageRoutingModule {}
