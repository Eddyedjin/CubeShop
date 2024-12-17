import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagenAddPage } from './imagen-add.page';

const routes: Routes = [
  {
    path: '',
    component: ImagenAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagenAddPageRoutingModule {}
