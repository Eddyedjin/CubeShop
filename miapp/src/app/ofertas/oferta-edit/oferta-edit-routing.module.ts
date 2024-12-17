import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfertaEditPage } from './oferta-edit.page';

const routes: Routes = [
  {
    path: '',
    component: OfertaEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfertaEditPageRoutingModule {}
