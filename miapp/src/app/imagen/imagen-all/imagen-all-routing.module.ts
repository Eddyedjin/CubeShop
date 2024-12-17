import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagenAllPage } from './imagen-all.page';

const routes: Routes = [
  {
    path: '',
    component: ImagenAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagenAllPageRoutingModule {}
