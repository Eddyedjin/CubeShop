import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DireccionDetailPage } from './direccion-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DireccionDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DireccionDetailPageRoutingModule {}

