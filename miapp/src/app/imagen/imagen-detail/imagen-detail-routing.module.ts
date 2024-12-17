import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagenDetailPage } from './imagen-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ImagenDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagenDetailPageRoutingModule {}
